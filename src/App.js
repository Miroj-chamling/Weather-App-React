// import Geolocation from "./geolocation";

import cloudy from "./assets/cloudy.jpg";
import haze from "./assets/haze.jpg";
import rainy from "./assets/rainy.jpg";
import snow from "./assets/snow.jpg";
import thunder from "./assets/thunder.jpg";
import drizzle from "./assets/drizzle.jpg";

import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactAnimatedWeather from "react-animated-weather";
import {
  faLocationDot,
  faSun,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons";

import "./app.css";

const App = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [humidity, SetHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [main, setMain] = useState("");
  const [icon, setIcon] = useState("");
  const [background, setBackground] = useState("");
  const [country, setCountry] = useState("");
  // const [query, setQuery] = useState("");
  // const [weather, setWeather] = useState("");
  // const [error, setError] = useState("");

  let defaults = {
    color: "orange",
    size: 50,
    animate: true,
  };

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log("Error retriving the Geolocation: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by the browser.");
    }
  };

  const formatTimeSr = (sunrise) => {
    const timestamp = sunrise * 1000;
    const time = new Date(timestamp);
    const formattedTime = time.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    setSunrise(formattedTime);
  };
  const formatTimeSs = (sunset) => {
    const timestamp = sunset * 1000;
    const time = new Date(timestamp);
    const formattedTime = time.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    setSunset(formattedTime);
  };

  const getWeather = async (lat, lon) => {
    try {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=565e07b049ffdf7d99e988c6699cb538`
      );
      const data = await api_call.json();
      setCity(data.name);
      setTemperature(Math.round(data.main.temp));
      SetHumidity(data.main.humidity);
      setVisibility(data.visibility);
      setWindSpeed(data.wind.speed);
      formatTimeSr(data.sys.sunrise);
      formatTimeSs(data.sys.sunset);
      setPressure(data.main.pressure);
      setMain(data.weather[0].main);
      setCountry(data.sys.country);
      switch (main) {
        case "Haze":
          setIcon("FOG");
          background(haze);
          break;
        case "Clouds":
          setIcon("CLOUDY");
          setBackground(cloudy);
          break;
        case "Rain":
          setIcon("RAIN");
          setBackground(rainy);
          break;
        case "Snow":
          setIcon("SNOW");
          setBackground(snow);
          break;
        case "Dust":
          setIcon("WIND");
          setBackground(haze);
          break;
        case "Drizzle":
          setIcon("SLEET");
          setBackground(drizzle);
          break;
        case "Fog":
          setIcon("FOG");
          setBackground(haze);
          break;
        case "Smoke":
          setIcon("FOG");
          setBackground(haze);
          break;
        case "Thunderstorm":
          setIcon("WIND");
          setBackground(thunder);

          break;
        default:
          setIcon("CLEAR_DAY");
      }

      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // const search = async (city) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${
  //         city != "[object Object]" ? city : query
  //       }&units=metric&APPID=565e07b049ffdf7d99e988c6699cb538`
  //     );
  //     setWeather(response.data);
  //     setQuery("");
  //   } catch (error) {
  //     console.log(error);
  //     setWeather("");
  //     setQuery("");
  //     setError({ message: "City not Found", query: query });
  //   }
  // };

  useEffect(() => {
    getGeoLocation();
    getWeather(latitude, longitude);
    // search("Delhi");
  });

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <div
      className="main-container"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="side-container">
        {/* <div className="search-container">
          <FontAwesomeIcon icon={faLocationDot} className="loc-icon" />
          <input
            type="text"
            className="search-bar"
            placeholder="Search City"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div> */}
        <div className="display container">
          <div className="maindisplay">
            {temperature}°C <br />
          </div>
          <div className="location">
            {city},<h3>{country}</h3>
            <br />
            {dateBuilder(new Date())}
          </div>
          <br />
        </div>

        <div className="info-rows">
          <div className="info-row">
            <div className="title">Humidity</div>
            <div className="info">{humidity}%</div>
          </div>
          <div className="info-row">
            <div className="title">Pressure</div>
            <div className="info">{pressure} Hg</div>
          </div>
          <div className="info-row">
            <div className="title">Wind Speed</div>
            <div className="info">{windSpeed} Km/Hr</div>
          </div>
          <div className="info-row">
            <div className="title">Visibility</div>
            <div className="info">{visibility} mi</div>
          </div>
          <br />
          <div className="sunInfo">
            <br />
            <br />
            Sunrise <FontAwesomeIcon icon={faSun} /> : {sunrise}
            <br />
            <br />
            Sunset <FontAwesomeIcon icon={faCloudSun} /> : {sunset}
          </div>
          {/* <div className="info-row">
            <div className="title">Sunrise</div>
            <div className="info">{sunrise}</div>
          </div>
          <div className="info-row">
            <div className="title">Sunset</div>
            <div className="info">{sunset}</div>
          </div> */}
          {/* <Geolocation></Geolocation> */}
        </div>
      </div>
      <div className="bannerContainer">
        <div className="weather">
          {main}{" "}
          <ReactAnimatedWeather
            icon={icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
