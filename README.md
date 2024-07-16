# Weather App

A modern and user-friendly weather application built using React, Luxon, and React Toastify. This application fetches weather data from the OpenWeatherMap API and displays current weather conditions, hourly forecasts, and daily forecasts.

## Features

- **Current Weather**: Displays the current temperature, feels-like temperature, minimum and maximum temperatures, humidity, wind speed, weather details, and an icon representing the weather conditions.
- **Hourly Forecast**: Provides the temperature, weather icon, and time for the next 5 hours.
- **Daily Forecast**: Shows the temperature, weather icon, and day for the upcoming days.
- **Error Handling**: Utilizes toast notifications to alert users of any errors encountered while fetching data.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Luxon**: A library for working with dates and times.
- **React Toastify**: A library for adding notifications to your app.
- **OpenWeatherMap API**: An API for accessing weather data.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- **Node.js** and **npm** must be installed on your machine.
- Obtain an API key from [OpenWeatherMap](https://home.openweathermap.org/users/sign_up).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sahaalaf/weather-app.git
2. **Navigate to the project directory**
   cd weather-app
3. **Install dependencies**
   npm install
4. **Create a .env file in the root directory and add your OpenWeatherMap API key**
   REACT_APP_API_KEY=your_api_key_here

