const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

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
