import dotenv from 'dotenv'
import { EmailConfig } from '../types/types'

dotenv.config();

export function getEmailConfig(): EmailConfig {
    return {
        host: process.env.SMTP_HOST || '',
        port: parseInt(process.env.SMTP_PORT || '587'),
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
        to: process.env.EMAIL_TO || '',
    };
}

export function validateConfig(config: EmailConfig): boolean {
    return !!(config.host && config.port && config.user && config.pass && config.to);
}