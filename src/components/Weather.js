import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";
import search_icon from "../images/search_icon.png";
import rain_icon from "../images/rain.png";
import Humid_icon from "../images/humidity.png";
import Wind_icon from "../images/wind.png";
import snow_icon from "../images/snow.png";
import Clouds from "../images/cloudy.png";
import sun_icon from "../images/sun.png";


 


const Weather = () => {

    

  const [data, setData, ]=useState({
    //initialization of weather data
    celcius: 20,
    name: 'Ethiopia',
    humidity:84,
    speed: 4,
    image: Clouds
  })

      const [name, setName] = useState('');
      const [error, setError] = useState("");
  

  const handleClick = () => {
    
    if (name !== "") {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=fb2ef809e21971f153f0c8cb396088a5&units=metric`;
      

    
      axios.get(apiUrl)
        .then((response) => {
          

          let weatherIcons = ""; 
         
          switch (response.data.weather[0].main) {
            case "Rain":
              weatherIcons = rain_icon;
              break;
            case "Snow":
              weatherIcons = snow_icon;
              break;
            case "Clear":
              weatherIcons = sun_icon;
              break;
            case "Clouds":
              weatherIcons = Clouds;
              break;
            default:
              weatherIcons = Clouds;
          }


          const windSpeed= response.data.wind ? response.data.wind.speed : 0;
          setData({
            celcius: response.data.main.temp,
            name: response.data.name,
            humidity: response.data.main.humidity,
            speed: windSpeed,
            image: weatherIcons
          });

           setError("");
        })

        //error handling
        .catch((error) =>{
          if (error.response.status === 404) {
            setError("Sorry You Entered Invalid City Name");  //this means the city name we entered doesn't exist in the API or the API couldn't find the requested city
          } else{
            setError("An error occurred. Please try again.");
          }

        });
    }
  };
  return (
  
    <div className="weather-info">
      
      <div className="search-icon">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <img src={search_icon} onClick={handleClick} alt="" />
      </div>
         
         <div className="error">
          <p>
           {error}
          </p>
         </div>

      <img className="weather_icon" src={data.image} alt="" />
      <p className="temperature">{data.celcius}℃</p>
      <p className="location">{data.name}</p>
      

      <div className="weather-data">
        <div className="icon">
          <img src={Humid_icon} alt="" />

          <div>
            <p>{data.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="icon">
          <img src={Wind_icon} alt="" />

          <div>
            <p>{data.speed}km/h</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather; 