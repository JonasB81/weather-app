import { useState } from "react";
import "./App.css";

function App() {
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState("");

  const handleWeatherClick = (weather) => {
    setSelectedWeather(weather);
  };

  const handleSearch = () => {
    if (city.trim()) {
      setSelectedCity(city);
      // Här kommer vi senare lägga till API-anrop för att hämta väderdata
      // För nu sätter vi dummy-data
      setTemperature(20);
      setWindSpeed(15);
      setHumidity(65);
      setWeatherDescription("Soligt och varmt");
    }
  };

  return (
    <>
      <div className="weather-icons">
        <img
          src="/img/sun.png"
          className={`logo ${selectedWeather === "sun" ? "selected" : ""}`}
          alt="Sun"
          onClick={() => handleWeatherClick("sun")}
        />
        <img
          src="/img/cloud.png"
          className={`logo ${selectedWeather === "cloud" ? "selected" : ""}`}
          alt="Cloud"
          onClick={() => handleWeatherClick("cloud")}
        />
      </div>
      <h1>Weather App</h1>
      <div className="card">
        <p>
          {selectedWeather
            ? `Du valde: ${
                selectedWeather === "sun" ? "Soligt" : "Molnigt"
              } väder! eller sök nedan för att se väder i din stad`
            : "Välj ett väder genom att klicka på en ikon"}
        </p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Skriv in din stad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>Sök</button>
        </div>

        {selectedCity && (
          <div className="weather-info">
            <p>Väder i {selectedCity}</p>
            <p>Temperatur: {temperature}°C</p>
            <p>Vindhastighet: {windSpeed} km/h</p>
            <p>Fuktighet: {humidity}%</p>
            <p>Väderbeskrivning: {weatherDescription}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
