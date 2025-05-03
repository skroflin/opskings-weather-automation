import axios from "axios";
import { WeatherData, HolidayData } from "../types/types";

export const WEATHER_STATS = 'https://hook.eu2.make.com/7mfiayunbpfef8qlnielxli5ptoktz02';
export const PUBLIC_HOLIDAYS = 'https://hook.eu2.make.com/76g53ebwgbestjsj1ikejbaicpnc5jro';

export async function fetchWithRetry<T>(url: string, maxRetries: number = 3, delay: number = 10000): Promise<T> {
    let retries = 0;

    while (retries < maxRetries) {
        try {
            const response = await axios.get<T>(url);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 429) {
                console.log(`Rate limited (429). Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                retries++;
            } else {
                throw error;
            }
        }
    }

    throw new Error(`Failed after ${maxRetries} retries.`)
}

export async function fetchWeatherData(): Promise<WeatherData[]> {
    const data = await fetchWithRetry<any>(WEATHER_STATS);
    console.log('Raw weather data structure:', JSON.stringify(data).substring(0, 500) + '...');
    if (!Array.isArray(data)) {
        console.error('Weather data is not an array:', typeof data);
        if (data && typeof data === 'object' && Array.isArray(data.data)) {
            return data.data;
        }
        return [];
    }

    return data;
}

export async function fetchHolidayData(): Promise<HolidayData[]> {
    return fetchWithRetry<HolidayData[]>(PUBLIC_HOLIDAYS);
}