import { DateTime } from "luxon";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = "0d9031d32854c42e3de5b22c6209eb6a";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeather = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    toast.error("Error Occurred: Unable to fetch weather data.");
  }
};

const ICON = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

const formatLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy ' | Local time: 'hh:mm a"
) => {
  return DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);
};

const formattedData = async (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const finalLocalTime = formatLocalTime(dt, timezone);
  const formattedSunrise = formatLocalTime(sunrise, timezone, "hh:mm a");
  const formattedSunset = formatLocalTime(sunset, timezone, "hh:mm a");
  return {
    lon,
    lat,
    temp: Math.round(temp),
    feels_like: Math.round(feels_like),
    temp_min: Math.round(temp_min),
    temp_max: Math.round(temp_max),
    humidity,
    name,
    country,
    sunrise: formattedSunrise,
    sunset: formattedSunset,
    speed,
    details,
    icon: ICON(icon),
    finalLocalTime,
  };
};


const forecastWeather = (secs, offset, data) => {
  // 3 hours
  const hourly = data
    .filter((f) => f.dt > secs)
    .slice(0, 5)
    .map((f) => ({
      temp: Math.round(f.main.temp),
      title: formatLocalTime(f.dt, offset, "hh:mm a"),
      icon: ICON(f.weather[0].icon),
      date: f.dt_txt,
    }));

  // daily
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: Math.round(f.main.temp),
      title: formatLocalTime(f.dt, offset, "ccc"),
      icon: ICON(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

const getFinalData = async (searchParams) => {
  try {
    const weatherData = await getWeather("weather", searchParams);
    const {
      dt,
      coord: { lat, lon },
      timezone,
    } = weatherData;

    const formattedCurrentData = await formattedData(weatherData);

    const forecastData = await getWeather("forecast", {
      lat,
      lon,
      units: searchParams.units,
    });
    const finalForecast = forecastWeather(dt, timezone, forecastData.list);

    return { ...formattedCurrentData, ...finalForecast };
  } catch (error) {
    console.error("Error retrieving weather data:", error);
    throw error; 
  }
};

export default getFinalData;
