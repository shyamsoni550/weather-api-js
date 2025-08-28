document.addEventListener("DOMContentLoaded", () => {
    require('dotenv').config();
    const cityinput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherinfo = document.getElementById("weather-info");
    const citynametext = document.getElementById("city-name-text");
    const tempreturetext = document.getElementById("tempreature-text");
    const descriptiontext = document.getElementById("description-text");
    const errormessage = document.getElementById("error-message");
    const API_KEY = process.env.API_KEY;


    getWeatherBtn.addEventListener("click", async () => {
        if (getWeatherBtn.textContent === "Clear Weather") {
            // Reset the UI
            cityinput.value = "";
            weatherinfo.classList.add("hidden");
            errormessage.classList.add("hidden");
            getWeatherBtn.textContent = "Get Weather";
            cityinput.focus();
            return;
        }

        const city = cityinput.value.trim();
        if (!city) return;

        try {
            const weatherdata = await fetchWeatherData(city);
            displayWeatherData(weatherdata);
            getWeatherBtn.textContent = "Clear Weather";
        } catch (error) {
            showerror();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("city not found");
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        const { main, name, weather } = data;
        citynametext.textContent = name;
        tempreturetext.textContent = `${main.temp} °C`;
        descriptiontext.textContent = weather[0].description;

        weatherinfo.classList.remove("hidden");
        errormessage.classList.add("hidden");
    }

    function showerror() {
        weatherinfo.classList.add('hidden');
        errormessage.classList.remove('hidden');
    }
});