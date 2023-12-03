
<template>
  <div>
    <div ref="map" style="height: 400px;"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import axios from 'axios';
import { locations } from '../assets/list/CountryList.ts';

export default {
  data() {
    return {
      map: null,
        apiKey: import.meta.env.VITE_API_URL,
        locations: locations,

    };
  },
  mounted() {
    this.initMap();
    this.getWeatherForLocations();
  },
  methods: {
    initMap() {
      this.map = L.map(this.$refs.map).setView([0, 0], 2); // Startweergave

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(this.map);
    },
    async getWeatherForLocations() {
      for (const location of this.locations) {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${this.apiKey}&units=metric`);
          this.addWeatherMarker(location, response.data);
        } catch (error) {
          console.error(error);
        }
      }
    },
    addWeatherMarker(location, weatherData) {
      const marker = L.marker([location.lat, location.lon]).addTo(this.map);
      const content = `
        <h2>${location.name}</h2>
        <p>${weatherData.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="Weather Icon" />
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
      `;
      marker.bindPopup(content);
    },
  },
};
</script>

<style>
/* Add any necessary styles for your map container here */
#map {
  height: 400px;
}
</style>
