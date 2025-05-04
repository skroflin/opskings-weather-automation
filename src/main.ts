import { getEmailConfig, validateConfig } from "./utils/config";
import { fetchHolidayData, fetchWeatherData } from "./services/apiService";
import { processWeatherData } from "./services/dataProcessingService";
import { createTransport, generateEmailContent, sendEmail } from "./services/emailService";
import { generateWeatherStatsJson } from "./services/generateWeatherStatsJson";

export async function generateWeatherReport(): Promise<void> {
    try {
        const emailConfig = getEmailConfig();
        if (!validateConfig(emailConfig)) {
            throw new Error('Invalid email configuration. Please check your .env file.');
        }

        const weatherData = await fetchWeatherData();
        const holidayData = await fetchHolidayData();

        const stats = processWeatherData(weatherData, holidayData);
        const emailContent = generateEmailContent(stats);
        const transporter = createTransport(emailConfig);

        const jsonFilePath = generateWeatherStatsJson(weatherData, holidayData);

        await sendEmail(transporter, emailConfig.user, emailConfig.to, emailContent, jsonFilePath);

        console.log('Email content:');
        console.log(emailContent);
    } catch (error) {
        console.error('Error generating weather report:', error);
    }
}

if (require.main === module) {
    generateWeatherReport();
}