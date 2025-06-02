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
  const [windGust, setWindGust] = useState(null);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
    // Ladda senaste sökta stad och dess väderdata
    const savedCity = localStorage.getItem("lastCity");
    const savedWeatherData = localStorage.getItem("lastWeatherData");
    
    if (savedCity) {
      setCity(savedCity);
      setSelectedCity(savedCity);
    }
    
    if (savedWeatherData) {
      const weatherData = JSON.parse(savedWeatherData);
      setTemperature(weatherData.temperature);
      setWindSpeed(weatherData.windSpeed);
      setHumidity(weatherData.humidity);
      setWeatherDescription(weatherData.weatherDescription);
      setWindDirection(weatherData.windDirection);
      setWindGust(weatherData.windGust);
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
        // Spara senaste sökta stad och dess väderdata
        localStorage.setItem("lastCity", city);
        localStorage.setItem(
          "lastWeatherData",
          JSON.stringify({
            temperature: data.current.temp_c,
            windSpeed: data.current.wind_kph,
            humidity: data.current.humidity,
            weatherDescription: data.current.condition.text,
            windDirection: data.current.wind_dir,
            windGust: data.current.gust_kph,
          })
        );
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
    </div>
  );
}

export default App;
