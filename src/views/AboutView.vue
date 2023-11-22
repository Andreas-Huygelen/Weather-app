<script>
import axios from 'axios';

export default {
  data() {
    return {
      location: 'Mortsel',
      weatherData: null,
      apiKey: import.meta.env.VITE_API_URL
      
    };
    
  },
  
  methods: {
    async getWeather() {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.apiKey}`);
        this.weatherData = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
<template>
  <div>
    <input type="text" v-model="location" placeholder="Voer locatie in" @keyup.enter="getWeather">
    <button @click="getWeather">Zoek weer</button>

    <div v-if="weatherData">
      <h2>{{ weatherData.name }}</h2>
      <p>{{ weatherData.weather[0].description }}</p>
      <p>Temperatuur: {{ weatherData.main.temp }}°C</p>
      <!-- Andere relevante weerinformatie weergeven -->
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>