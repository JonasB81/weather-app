import { useState, useEffect } from "react";
import "./App.css";
import { getCurrentWeather } from "./services/weatherService";

function App() {
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [windDirection, setWindDirection] = useState(null);
  const [windGust, setWindGust] = useState(null);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const handleWeatherClick = (weather) => {
    setSelectedWeather(weather);
  };

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
        setWindGust(data.current.gust_kph);
      } catch (err) {
        setError(
          "Kunde inte hämta väderdata. Kontrollera att stadsnamnet är korrekt."
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="theme-toggle">
        <button onClick={toggleDarkMode} className="theme-button">
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
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
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "Laddar..." : "Sök"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {selectedCity && !error && (
          <div className="weather-info">
            <p>Väder i {selectedCity}</p>
            <p>Temperatur: {temperature}°C</p>
            <p>Vindhastighet: {windSpeed} km/h</p>
            <p>Fuktighet: {humidity}%</p>
            <p>Väderbeskrivning: {weatherDescription}</p>
            <p>Vindriktning: {windDirection}</p>
            <p>Vindgust: {windGust} km/h</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
