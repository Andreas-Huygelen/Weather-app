
<template>
  
    <div>
  
  
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
  