// Replace with your own API key from https://openweathermap.org/api
const API_KEY = "YOUR_API_KEY_HERE";

document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("cityInput");
  const searchBtn = document.getElementById("searchBtn");
  const weatherInfo = document.getElementById("weatherInfo");
  const errorMessage = document.getElementById("errorMessage");

  // Load last searched city from localStorage
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    fetchWeather(lastCity);
  }

  // Button click listener
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
      showError("Please enter a city name.");
      return;
    }
    fetchWeather(city);
  });

  // Async function to fetch weather data
  async function fetchWeather(city) {
    try {
      errorMessage.textContent = "";
      weatherInfo.style.display = "none";

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      displayWeather(data);
      localStorage.setItem("lastCity", city); // Save last searched city
    } catch (error) {
      showError(error.message);
    }
  }

  // Display weather info in the DOM
  function displayWeather(data) {
    const { name, main, weather } = data;

    weatherInfo.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Temperature:</strong> ${main.temp}°C</p>
      <p><strong>Condition:</strong> ${weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon">
    `;

    weatherInfo.style.display = "block";
  }

  // Show error message
  function showError(msg) {
    errorMessage.textContent = msg;
  }
});
