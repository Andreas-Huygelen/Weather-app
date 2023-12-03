
<template>
  
    <div>

        <input type="text" v-model="location" placeholder="Voer locatie in" @keyup.enter="getWeather">
        <button @click="getWeather">Zoek weer</button>
  
        <div class="details-page">
            <div ref="map" style="height: 400px; width: 400px"></div>
            <div class="details" v-if="weatherData">
      <img :src="`https://flagsapi.com/${weatherData.sys.country}/flat/64.png`">
                <h2>{{ weatherData.name }}</h2>
                <p>{{ weatherData.weather[0].description }}</p>
                <div>
                    <img class="weather-icon" :src="getWeatherIconUrl(weatherData.weather[0].icon)" :alt="weatherData.weather[0].description">
                </div>
                <p>{{ weatherData.sys.country }}</p>
                <p>Temperatuur: {{ weatherData.main.temp - 273.15  }}°C</p>
                <p>clouds: {{ weatherData.clouds.all  }}%</p>
                <p>humidity: {{ weatherData.main.humidity  }}%</p>
                <p>Wind speed: {{ weatherData.wind.speed  }} m/s</p>
                <p>Sunrise: {{ sunrise   }} AM</p>
                <p>Sunset: {{ sunset   }} PM</p>
                <!-- Andere relevante weerinformatie weergeven -->
            </div>
        </div>
        
      </div>
  </template>
  
  <script>
  import axios from 'axios';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
    data() {
      return {
        location: 'Antwerpen',
        weatherData: null,
        apiKey: import.meta.env.VITE_API_URL,
        
      };
      
    },
    mounted() {
    },
    methods: {
      
      
      async getWeather() {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.apiKey}`);
          this.weatherData = response.data;
          console.log (this.weatherData.name)
          await this.updateMap(this.weatherData.name,this.weatherData.sys.country,this.weatherData.coord.lat,this.weatherData.coord.lon)
        } catch (error) {
          console.error(error);
        }
      },
      updateMap(city, country, lat, lon) {
  // Controleer of de kaart al is geïnitialiseerd
  if (!this.map) {
    this.initMap(city, country, lat, lon);
  } else {
    // Verplaats de kaartweergave naar de nieuwe locatie
    this.map.setView([lat, lon], 13);

    // Verplaats de marker naar de nieuwe locatie en update de pop-up
    this.marker.setLatLng([lat, lon]).bindPopup(city + ' , ' + country).openPopup();
  }
},

initMap(city, country, lat, lon) {
  this.map = L.map(this.$refs.map).setView([lat, lon], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(this.map);

  // Voeg een marker toe voor de opgegeven locatie
  this.marker = L.marker([lat, lon]).addTo(this.map)
    .bindPopup(city + ' , ' + country)
    .openPopup();
},
        getWeatherIconUrl(iconCode) {
        return `https://openweathermap.org/img/wn/${iconCode}.png`;
        },
    },
    computed: {
      sunrise() {
        const timestamp = new Date(this.weatherData.sys.sunrise * 1000); // Convert Unix timestamp to milliseconds
        return timestamp.toLocaleString().slice(11,19); // Display in the local date/time format
      },
      sunset() {
        const timestamp = new Date(this.weatherData.sys.sunset * 1000); // Convert Unix timestamp to milliseconds
        return timestamp.toLocaleString().slice(11,19); // Display in the local date/time format
      },
    },
  };
  </script>
  
  <style>
  
input[type="text"] {
  padding: 8px;
  margin-right: 8px;
}
button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #2980b9;
}
.details-page{
    display: flex;
}
.details{
    margin-left: 25px;
}
.weather-icon {
    background-color: rgb(230, 230, 230);
    border: 2px solid lightgray;
    border-radius: 50%;
}

  </style>
  