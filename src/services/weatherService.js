const API_KEY = "a4d4dc84fb3e460f84680421250206";
const BASE_URL = "http://api.weatherapi.com/v1";

export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );

    if (!response.ok) {
      throw new Error("Kunde inte hämta väderdata");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fel vid hämtning av väderdata:", error);
    throw error;
  }
};
