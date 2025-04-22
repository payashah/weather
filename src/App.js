import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = "4dd7f02c00a8ac745daa4b8e136a0786";

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('لطفاً نام شهر را وارد کنید!');
      return;
    }

    setLoading(true);
    setError('');
    setCity("")

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=fa`
      );
      console.log('تمام داده‌های دریافتی:', response.data);

      setWeather(response.data);
    } catch (err) {
      setError('شهر یافت نشد!');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return '☀️';
      case 'Rain':
        return '🌧️';
      case 'Clouds':
        return '☁️';
      default:
        return '🌤️';
    }
  };

  return (
    <div className="app-main">
      <div className="app">
        <h1 className="app-h1"> سامانه آب و هوا</h1>
        <div className="search-box">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="نام شهر را وارد کنید..."
          />
          <button onClick={fetchWeather} disabled={loading}>
            {loading ? 'در حال اجرا...' : 'جستجو'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <div className="weather-icon">
              {getWeatherIcon(weather.weather[0].main)}
            </div>


            <h2>{weather.name}</h2>
            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p className="desc">{weather.weather[0].description}</p>
            <div className="details">


              <span>رطوبت: {weather.main.humidity}%</span>

              <span>باد: {weather.wind.speed} km/h</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;