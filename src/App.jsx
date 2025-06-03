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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [windDirection, setWindDirection] = useState(null);
  const [windGust, setWindGust] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);

  useEffect(() => {
    // Ladda senaste sökta stad och dess väderdata
    const savedCity = localStorage.getItem("lastCity");
    const savedWeatherData = localStorage.getItem("lastWeatherData");
    const savedFavorites = localStorage.getItem("favoriteCities");

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

    if (savedFavorites) {
      setFavoriteCities(JSON.parse(savedFavorites));
    }
  }, []);

  const handleWeatherClick = (weather) => {
    setSelectedWeather(weather);
  };

  const addToFavorites = () => {
    if (selectedCity && !favoriteCities.includes(selectedCity)) {
      const newFavorites = [...favoriteCities, selectedCity];
      setFavoriteCities(newFavorites);
      localStorage.setItem("favoriteCities", JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (cityToRemove) => {
    const newFavorites = favoriteCities.filter((city) => city !== cityToRemove);
    setFavoriteCities(newFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(newFavorites));
  };

  const handleFavoriteClick = async (favoriteCity) => {
    setCity(favoriteCity);
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCurrentWeather(favoriteCity);
      setSelectedCity(favoriteCity);
      setTemperature(data.current.temp_c);
      setWindSpeed(data.current.wind_kph);
      setHumidity(data.current.humidity);
      setWeatherDescription(data.current.condition.text);
      setWindDirection(data.current.wind_dir);
      setWindGust(data.current.gust_kph);
      // Spara senaste sökta stad och dess väderdata
      localStorage.setItem("lastCity", favoriteCity);
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
      setError(
        "Kunde inte hämta väderdata. Kontrollera att stadsnamnet är korrekt."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
      <h1>Väder App</h1>
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
            <div className="weather-header">
              <h3>Väder i {selectedCity}</h3>
              {!favoriteCities.includes(selectedCity) && (
                <button onClick={addToFavorites} className="favorite-btn">
                  ⭐ Lägg till favorit
                </button>
              )}
            </div>
            <p>Temperatur: {temperature}°C</p>
            <p>Vindhastighet: {windSpeed} km/h</p>
            <p>Fuktighet: {humidity}%</p>
            <p>Väderbeskrivning: {weatherDescription}</p>
            <p>Vindriktning: {windDirection}</p>
            <p>Vindby: {windGust} km/h</p>
          </div>
        )}

        {favoriteCities.length > 0 && (
          <div className="favorites-section">
            <h3>Favoritstäder</h3>
            <div className="favorites-list">
              {favoriteCities.map((favoriteCity) => (
                <div key={favoriteCity} className="favorite-item">
                  <span
                    onClick={() => handleFavoriteClick(favoriteCity)}
                    className="favorite-city-name"
                  >
                    {favoriteCity}
                  </span>
                  <button
                    onClick={() => removeFromFavorites(favoriteCity)}
                    className="remove-favorite-btn"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
