import { WeatherData, HolidayData, ProcessedStats } from "../types/types";

export function processWeatherData(weatherData: WeatherData[], holidayData: HolidayData[]): ProcessedStats {
    const temperatures = weatherData
        .map(item => {
            const temp = Number(item.temperature);
            if (isNaN(temp)) {
                console.warn(`Invalid temperature value found: ${item.temperature}`);
                return null;
            }
            return temp
        })
        .filter((temp): temp is number => temp !== null);

    if (temperatures.length === 0) {
        console.error('No valid temperature values found in the data');
        return {
            maxTemp: 0,
            avgTemp: 0,
            minTemp: 0,
            skyCountsText: 'No data available',
            rainShowersText: 'No data available',
            skyHolidaysText: 'No data available'
        };
    }

    const maxTemp = Math.max(...temperatures);
    const sum = temperatures.reduce((acc, temp) => acc + temp, 0)
    const avgTemp = parseFloat((sum / temperatures.length).toFixed(2));
    const minTemp = Math.min(...temperatures);

    const skyValues = weatherData.map(item => item.sky);
    const uniqueSkyValues = [...new Set(skyValues)];

    const skyCounts: Record<string, number> = uniqueSkyValues.reduce((acc, sky) => {
        acc[sky] = weatherData.filter(item => item.sky === sky).length;
        return acc;
    }, {} as Record<string, number>);

    const skyCountsText = Object.entries(skyCounts)
        .map(([sky, count]) => `${sky}: ${count}`)
        .join('\n');

    const rainShowers: string[] = [];

    weatherData.forEach(item => {
        if (item.times_of_rain_showers) {
            const times = item.times_of_rain_showers.split(',').map(time => time.trim())
            times.forEach(time => {
                rainShowers.push(`${item.date} ${time}`);
            })
        }
    })

    const rainShowersText = rainShowers.length > 0
        ? rainShowers.join('\n')
        : 'No rain showers this month.';

    const holidayDates = holidayData.map(holiday => holiday.date);
    const skyDuringHolidays = weatherData
        .filter(item => holidayDates.includes(item.date))
        .map(item => `${item.date} - ${item.sky}`);

    const skyHolidaysText = skyDuringHolidays.length > 0
        ? skyDuringHolidays.join('\n')
        : 'No holidays this month.';

    return {
        maxTemp,
        avgTemp,
        minTemp,
        skyCountsText,
        rainShowersText,
        skyHolidaysText
    };
}