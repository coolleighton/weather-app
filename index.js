
let map = L.map('map')
map.setView([0, 0], 1); 

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

let weather = {
    "weatherKey": "be9b75a065e73e1cac727dcc8207ba9e",

    getWeatherData : function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city
        + "&units=metric&appid="
        + this.weatherKey
        )
        .then((Response) => Response.json())
        .then((data) => this.displayWeatherData(data))
    },
    displayWeatherData: function(data) {

        const { humidity, pressure, temp, feels_like, temp_max, temp_min,} = data.main;
        const { lon, lat } = data.coord;
        const { country, sunrise, sunset,} = data.sys;
        const { description, icon } = data.weather[0]
        const { speed, deg } = data.wind
        const { timezone, visibility} = data
        const { all } = data.clouds

        const visibilityConverted = visibility / 1000
    
        const SunriseTime = new Date(sunrise * 1000).toLocaleTimeString(navigator.language, {hour: "2-digit", minute: "2-digit"});

        const SunsetTime = new Date(sunset * 1000).toLocaleTimeString(navigator.language, {hour: "2-digit", minute: "2-digit"});

        const sunriseConverted = sunrise + timezone
        const sunriseConvertedTime = new Date(sunriseConverted * 1000).toLocaleTimeString(navigator.language, {hour: "2-digit", minute: "2-digit"});

        const sunsetConverted = sunset + timezone
        const sunsetConvertedTime = new Date(sunsetConverted * 1000).toLocaleTimeString(navigator.language, {hour: "2-digit", minute: "2-digit"});

        map.setView([lat, lon], 12);

        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".temp").innerText = "Current Temperature: " + temp + "°C"
        document.querySelector(".description").innerText = description;
        document.querySelector(".feelsLike").innerText = "Feels Like: " + feels_like + "°C"
        document.querySelector(".tempMax").innerText = "Max Temperature: " + temp_max + "°C"
        document.querySelector(".tempMin").innerText = "Min Temperature: " + temp_min + "°C"
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%"
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + "hPa"
        document.querySelector(".windSpeed").innerText = 
        "Wind Speed: " + speed + "Km/h"
        document.querySelector(".direction").innerText = 
        "Wind Direction: " + deg + "°"
        document.querySelector(".cityCountryName").innerText = document.querySelector(".searchField").value + ", " + country
        document.querySelector(".latitude").innerText = "Latitude: " + lat
        document.querySelector(".longitude").innerText = "Longitude: " + lon
        document.querySelector(".sunrise").innerText = "Sunrise: " + SunriseTime
        document.querySelector(".sunset").innerText = "Sunset: " + SunsetTime
        document.querySelector(".sunriseLocal").innerText = "Sunrise: " + sunriseConvertedTime
        document.querySelector(".sunsetLocal").innerText = "Sunset: " + sunsetConvertedTime
        document.querySelector(".clouds").innerText = "Clouds: " + all + "%"
        document.querySelector(".visibility").innerText = "Visibility: " + visibilityConverted + "Km"

        document.querySelector(".flag").src = "https://flagsapi.com/" + country + "/flat/64.png"

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + document.querySelector(".searchField").value + "')"

    },
    
    search: function() {
        this.getWeatherData(document.querySelector(".searchField").value);
    }
}

document.querySelector(".searchButton").addEventListener("click", function() {

    weather.search();
})


weather.search();


