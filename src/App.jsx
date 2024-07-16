import React, { useEffect, useState } from 'react';
import NavbarPanel from './components/NavbarPanel';
import SearchBar from './components/SearchBar';
import TimeLocationBar from './components/TimeLocationBar';
import TempHumdityEtc from './components/TempHumdityEtc';
import Forecast from './components/Forecast';
import getFinalData from './service/weather';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [city, setCity] = useState({ q: "harbin" });
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await getFinalData({ ...city, units });
        setWeather(data);
        toast.success("Fetched Weather for " + city.q);
      } catch (error) {
        toast.error(`City with name ${city.q} is not found. Try Again`);
      }
    };

    getWeather();
  }, [city, units]);

  const getBackgroundColor = () => {
    if (weather) {
      const details = weather.details.toLowerCase();
      if (details.includes('clouds')) {
        return 'bg-gradient-to-b from-cyan-600 to-blue-600';
      } else if (details.includes('rain')) {
        return 'bg-gradient-to-b from-gray-600 to-gray-900';
      } else if (details.includes('clear')) {
        return 'bg-gradient-to-b from-gray-500 to-blue-700';
      } else if (details.includes('snow')) {
        return 'bg-gradient-to-b from-gray-200 to-white';
      } else if (details.includes('smoke')) {
        return 'bg-gradient-to-b from-gray-500 to-blue-300';
      } else {
        return 'bg-gradient-to-b from-green-500 to-blue-500';
      }
    }
    return '';
  };

  return (
    <div className={`w-full h-full ${getBackgroundColor()}`}>
      <div className={`mx-auto max-w-screen-lg py-5 px-32`}>
        <NavbarPanel setCity={setCity} />
        <SearchBar setCity={setCity} setUnits={setUnits} />
        {weather ? (
          <>
            <TimeLocationBar weather={weather} />
            <TempHumdityEtc weather={weather} />
            <Forecast title="3 HOUR STEP FORECAST" data={weather.hourly} />
            <Forecast title="DAILY FORECAST" data={weather.daily} />
            <ToastContainer />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
