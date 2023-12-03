<script setup>
</script>

<template>
    <div>
    <input type="text" v-model="location" placeholder="Voer locatie in" @keyup.enter="getWeather">
    <button @click="getWeather">Zoek weer</button>

    <div v-if="weatherData">
      <h2>{{ weatherData.name }}</h2>
      <p>{{ weatherData.weather[0].description }}</p>
      <p>{{ weatherData.sys.country }}</p>
      <p>Temperatuur: {{ weatherData.main.temp - 273.15  }}°C</p>
      <p>clouds: {{ weatherData.clouds.all  }}%</p>
      <p>humidity: {{ weatherData.main.humidity  }}%</p>
      <p>Wind speed: {{ weatherData.wind.speed  }} m/s</p>
      <!-- Andere relevante weerinformatie weergeven -->
    </div>
  </div>
</template>
