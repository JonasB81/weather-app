import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      setSelectedCity(city);
      // Här kommer vi senare lägga till API-anrop för att hämta väderdata
      // För nu sätter vi dummy-data
      setTemperature(20);
      setWindSpeed(15);
      setHumidity(65);
      setWeatherDescription("Perfect conditions for golf!");
    }
  };

  return (
    <div className="app-container">
      <div className="weather-content">
        <h1>Golf Weather</h1>
        <p className="weather-message">
          Find out where the best golf weather is today!
        </p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {selectedCity && (
          <div className="weather-info">
            <h2>{selectedCity}</h2>
            <div className="weather-grid">
              <div className="weather-item">
                <span className="label">Temperature</span>
                <span className="value">{temperature}°C</span>
              </div>
              <div className="weather-item">
                <span className="label">Wind Speed</span>
                <span className="value">{windSpeed} km/h</span>
              </div>
              <div className="weather-item">
                <span className="label">Humidity</span>
                <span className="value">{humidity}%</span>
              </div>
              <div className="weather-item">
                <span className="label">Conditions</span>
                <span className="value">{weatherDescription}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
