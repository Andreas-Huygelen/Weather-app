<template>
    <div ref="map" style="height: 400px;"></div>
  </template>
  
  <script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  props: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    placeName: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map(this.$refs.map).setView([this.latitude, this.longitude], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(this.map);
  
      // Voeg een marker toe voor de dynamische locatie
      L.marker([this.latitude, this.longitude]).addTo(this.map)
        .bindPopup(this.placeName)
        .openPopup();
    },
  },
};
</script>

<style>
/* Voeg stijlen toe indien nodig */
</style>
  