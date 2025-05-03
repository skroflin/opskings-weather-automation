export interface WeatherData {
    sky: string;
    city: string;
    date: string;
    degrees_in_celsius: number;
    times_of_rain_showers: string | null;
    temperature?: string;
    is_rainy?: boolean;
    time?: string;
}

export interface HolidayData {
    date: string;
    is_public_holiday: string;
    name?: string;
}

export interface ProcessedStats {
    maxTemp: number;
    avgTemp: number;
    minTemp: number;
    skyCountsText: string;
    rainShowersText: string;
    skyHolidaysText: string;
}

export interface EmailConfig {
    host: string;
    port: number;
    user: string;
    pass: string;
    to: string;
}