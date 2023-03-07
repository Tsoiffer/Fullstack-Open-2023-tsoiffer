import axios from "axios";
import { useState, useEffect } from "react";
const Weather = ({ countrieName }) => {
  const [weather, setweather] = useState({ success: false });
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: countrieName,
  };
  const weatherApi = "http://api.weatherstack.com/current";

  const promiseWeather = axios.get(weatherApi, { params });
  useEffect(() => {
    promiseWeather.then((result) => {
      console.log(result.data);
      console.log(result.data.success);
      console.log(params);
      result.data.current
        ? setweather({ ...result.data.current, success: true })
        : setweather({ success: false });
    });
  }, []);

  return (
    <>
      {weather.success ? (
        <>
          <h2>Weather in {countrieName}</h2>
          <p>
            <strong>temperature:</strong> {weather.temperature} Celcius
          </p>
          <img src={weather.weather_icons[0]} alt="" />
          <p>
            <strong>wind:</strong> {weather.wind_speed} mph direction{" "}
            {weather.wind_dir}
          </p>
        </>
      ) : (
        <>
          <h1>Sin informacion del clima</h1>
        </>
      )}
    </>
  );
};
export default Weather;
