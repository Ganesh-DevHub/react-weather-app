import React, { useState } from "react";
import axios from "axios";
import Clouds from "./assets/clouds.svg";

import DateTime from "./components/DateTime";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [main, setMain] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ec2d6b4f1fff6836bf13b8b43b41d8e8`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        setMain(response.data.weather[0].main);
        console.log(response.data);
      });
      setLocation("");
      setMain("");
    }
  };
  return (
    <div className="app">
      <div className="container">
        <div className="top-wrapped">
          <div className="top">
            <div className="date-time">
              <DateTime />
            </div>
          </div>
          <div className="middle">
            <div className="content">
              <p>{data.name}</p>
              {data.main ? (
                <h1>{(data.main.temp - 273).toString().split(".")[0]}°C</h1>
              ) : null}
            </div>
            <div className="description">
              <br />
              <img src={Clouds} alt="" />
              {data.weather ? <h2>{main}</h2> : null}
            </div>
          </div>
        </div>
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location..."
            type="text"
          />
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p>{(data.main.feels_like - 273).toString().split(".")[0]}°C</p>
            ) : null}
            <h2>Feels</h2>
          </div>
          <div className="humidity">
            {data.main ? <p>{data.main.humidity}%</p> : null}
            <h2>Humidity</h2>
          </div>
          <div className="wind">
            {data.wind ? <p>{data.wind.speed} MPH</p> : null}
            <h2>Wind Speed</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
