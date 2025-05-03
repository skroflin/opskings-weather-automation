import nodemailer from 'nodemailer';
import { ProcessedStats, EmailConfig } from '../types/types';

export function createTransport(config: EmailConfig) {
    return nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: false,
        auth: {
            user: config.user,
            pass: config.pass,
        },
    })
}

export function generateEmailContent(stats: ProcessedStats): string {
    return `Hi, here are your San Francisco weather stats for 2022-11:
        
The max temperature was: ${stats.maxTemp}
The avg temperature was: ${stats.avgTemp}
The min temperature was: ${stats.minTemp}
        
Overview of unique "sky" values and their counts:
${stats.skyCountsText}
        
Rain showers:
${stats.rainShowersText}
        
"Sky" statuses during holidays:
${stats.skyHolidaysText}
        
Have a nice day!`
}

export async function sendEmail(
    transporter: nodemailer.Transporter,
    from: string,
    to: string,
    content: string
): Promise<void> {
    const candidateEmail = 'sven.kroflin@gmail.com';

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDay()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const info = await transporter.sendMail({
        from,
        to,
        subject: `OpsKings|Practical Challenge|${candidateEmail}|${formattedDateTime}`,
        text: `### scenario URL: https://github.com/skroflin/opskings-weather-automation ###\n\n${content}`,
    });

    console.log('Email sent successfully:', info.messageId);
}