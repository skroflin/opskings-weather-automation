# Weather Report Automation

This project automates the process of fetching, processing, and reporting weather data for San Francisco. It generates a comprehensive email report with temperature statistics, sky conditions, rain shower times, and holiday information.

---

## Overview

This automation tool fetches weather data and public holiday information for San Francisco, processes it to extract meaningful statistics, and sends a formatted email report with the findings. It also generates a detailed JSON file containing all the weather data, which is attached to the email.

---

## Features

- Fetches weather data for San Francisco (November 2022)
- Retrieves public holiday information
- Calculates temperature statistics (min, max, average)
- Counts occurrences of different sky conditions
- Lists all rain shower times
- Shows sky conditions on public holidays
- Generates a comprehensive JSON file with all data
- Sends a formatted email report with the JSON attachment

---

## How to send?

Create a `.env` file in root directory where you must define your `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO`, `SMTP_HOST` and `SMTP_PORT`.

```
EMAIL_USER=your user email
EMAIL_PASS=6 digit password (generated via Gmail App Password)
EMAIL_TO=email recipient
SMTP_HOST=smtp host of your mail service
SMTP_PORT=mail port
```