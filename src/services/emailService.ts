import nodemailer from 'nodemailer';
import { ProcessedStats, EmailConfig } from '../types/types';

export function createTransport(config: EmailConfig) {
    return nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.port === 465,
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
    content: string,
    attachmentPath: string
): Promise<void> {
    const candidateEmail = 'sven.kroflin@gmail.com';

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const info = await transporter.sendMail({
        from,
        to,
        subject: `OpsKings\t|\tPractical Challenge\t|\t${candidateEmail}\t|\t${formattedDateTime}`,
        text: `### scenario URL: https://github.com/skroflin/opskings-weather-automation ###\n\n${content}`,
        attachments: [
            {
                filename: 'weather_stats.json',
                path: attachmentPath
            }
        ]
    });

    console.log('Email sent successfully:', info.messageId);
}