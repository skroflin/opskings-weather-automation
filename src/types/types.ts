export interface WeatherData {
    temperature: number;
    sky: string;
    is_rainy: boolean;
    time: string;
    date: string;
}

export interface HolidayData {
    date: string;
    name: string;
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