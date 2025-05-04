import fs from 'fs'
import path from 'path'
import { WeatherData, HolidayData } from '../types/types'

export function generateWeatherStatsJson(
    weatherData: WeatherData[],
    holidayData: HolidayData[]
): string {
    const holidayMap = holidayData.reduce((map, holiday) => {
        map[holiday.date] = holiday.is_public_holiday === 'yes';
        return map;
    }, {} as Record<string, boolean>);

    const combineData = weatherData.map(weather => {
        const rainShowers = weather.times_of_rain_showers
            ? weather.times_of_rain_showers.split(',').map(time => time.trim())
            : [];

        return {
            date: weather.date,
            city: weather.city,
            sky: weather.sky,
            temperature: weather.degrees_in_celsius,
            times_of_rain_showers: rainShowers,
            is_public_holiday: holidayMap[weather.date] || false
        };
    });

    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, 'weather_stats.json');
    fs.writeFileSync(filePath, JSON.stringify(combineData, null, 2));

    return filePath;
}