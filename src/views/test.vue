<template>
  <div>
    <div ref="map" style="height: 600px;"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet.heat';
import axios from 'axios';

export default {
  data() {
    return {
      map: null,
        apiKey: import.meta.env.VITE_API_URL,
      locations: [],
    };
  },
  mounted() {
    this.initMap();
    this.getWeatherForLocations();
  },
  methods: {
    initMap() {
      this.map = L.map(this.$refs.map).setView([0, 0], 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(this.map);
    },
    async getWeatherForLocations() {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/box/city?bbox=3.43,51.13,5.55,51.39,9&appid=${this.apiKey}&units=metric`);

        const locations = response.data.list;

    const heatData = locations.map(location => {
      return [location.coord.Lat, location.coord.Lon, location.main.temp];
    });
    this.locations = locations;
    this.createHeatmap(heatData);
      } catch (error) {
        console.error(error);
      }
    },
    createHeatmap(heatData) {
    console.log(heatData);
      const heat = L.heatLayer(heatData, {
        radius: 15,
        maxZoom: 10,
        gradient: {0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red'},
      }).addTo(this.map);
    },
  },
};
</script>

<style>
#map {
  height: 600px;
}
</style>
