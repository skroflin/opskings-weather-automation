import { WeatherData, HolidayData, ProcessedStats } from "../types/types";

export function processWeatherData(weatherData: WeatherData[], holidayData: HolidayData[]): ProcessedStats {
    const temperatures = weatherData.map(item => item.temperature);
    const maxTemp = Math.max(...temperatures);
    const avgTemp = parseFloat((temperatures.reduce((sum, temp) => sum + temp, 0 / temperatures.length).toFixed(2)));
    const minTemp = Math.min(...temperatures);

    const skyValues = weatherData.map(item => item.sky);
    const uniqueSkyValues = [...new Set(skyValues)];

    const skyCounts: Record<string, number> = uniqueSkyValues.reduce((acc, sky) => {
        acc[sky] = weatherData.filter(item => item.sky === sky).length;
        return acc;
    }, {} as Record<string, number>);

    const skyCountsText = Object.entries(skyCounts)
        .map(([sky, count]) => `${sky}: ${count}`)
        .join('\n ');

    const rainShowers = weatherData
        .filter(item => item.is_rainy)
        .map(item => item.time);

    const rainShowersText = rainShowers.length > 0
        ? rainShowers.join('\n ')
        : 'No rain showers this month.';

    const holidayDates = holidayData.map(holiday => holiday.date);
    const skyDuringHolidays = weatherData
        .filter(item => holidayDates.includes(item.date))
        .map(item => `${item.date} - ${item.sky}`);

    const skyHolidaysText = skyDuringHolidays.length > 0
        ? skyDuringHolidays.join('\n ')
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