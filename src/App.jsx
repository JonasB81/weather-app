import { useState } from "react";
import "./App.css";
import { getCurrentWeather } from "./services/weatherService";

function App() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [windDirection, setWindDirection] = useState(null);

  const handleSearch = async () => {
    if (city.trim()) {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCurrentWeather(city);
        setSelectedCity(city);
        setTemperature(data.current.temp_c);
        setWindSpeed(data.current.wind_kph);
        setHumidity(data.current.humidity);
        setWeatherDescription(data.current.condition.text);
        setWindDirection(data.current.wind_dir);
      } catch (err) {
        setError("Could not fetch weather data. Please check the city name.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
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
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "Loading..." : "Search"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {selectedCity && !error && (
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
                <span className="label">Wind Direction</span>
                <span className="value">{windDirection}</span>
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
