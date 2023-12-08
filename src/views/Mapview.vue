
<template>
  
  <div class="weather-app">
  
  
      <div class="details-page">
      <div ref="map" style="height: 400px; width: 400px; border-radius: 8px"></div>
      <div class="weather-details" v-if="weatherData">
        <div class="flag">
          <img :src="`https://flagsapi.com/${weatherData.sys.country}/flat/64.png`" alt="Flag">
        </div>
        <div class="weather-info">
          <h2>{{ weatherData.name }}</h2>
          <p>{{ weatherData.weather[0].description }}</p>
          <div class="weather-icon">
            <img :src="getWeatherIconUrl(weatherData.weather[0].icon)" :alt="weatherData.weather[0].description">
          </div>
          <p>{{ weatherData.sys.country }}</p>
          <p>Temperatuur: {{ (weatherData.main.temp - 273.15).toFixed(1) }}°C</p>
          <p>Bewolking: {{ weatherData.clouds.all }}%</p>
          <p>Vochtigheid: {{ weatherData.main.humidity }}%</p>
          <p>Windkracht: {{ weatherData.wind.speed }} m/s</p>
          <p>Zonsopgang: {{ sunrise }} AM</p>
          <p>Zonsondergang: {{ sunset }} PM</p>
          <!-- Andere relevante weerinformatie weergeven -->
        </div>
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
        location: this.$route.query.city,
        weatherData: null,
        apiKey: import.meta.env.VITE_API_URL,
        
      };
      
    },
    created() {
      this.getWeather(); // Direct ophalen van weerdata bij het maken van de component
    },
    mounted() {
    },
    methods: {
      
      initMap(city, country  , lat , lon) {
        this.map = L.map(this.$refs.map).setView([lat, lon], 13); // Startweergave van Mortsel
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(this.map);
          console.log (this.weatherData)
  
        // Voeg een marker toe voor Mortsel
        L.marker([lat, lon]).addTo(this.map)
          .bindPopup(city+' , ' + country)
          .openPopup();
      },
      async getWeather() {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.apiKey}`);
          this.weatherData = response.data;
          console.log (this.weatherData.name)
          await this.initMap(this.weatherData.name,this.weatherData.sys.country,this.weatherData.coord.lat,this.weatherData.coord.lon)
        } catch (error) {
          console.error(error);
        }
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
.weather-app {
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 8px;
  margin-right: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.details-page {
  display: flex;
  justify-content: space-between;
}

.weather-details {
  flex: 1;
  margin-left: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.flag img {
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.weather-icon img {
  border: 2px solid #eee;
  border-radius: 50%;
  padding: 4px;
  background-color: #f5f5f5;
}
</style>
  