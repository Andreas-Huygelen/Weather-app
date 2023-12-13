<template>
  <select v-model="selectedStyle">
      <option value="purpleYellow.point">Purple Yellow Points</option>
      <option value="glacier.point">Glacier Points</option>
      <!-- Voeg meer opties toe voor verschillende stijlen -->
    </select>
  <div class="container">
    <l-map style="height: 400px;" class="leaflet" :zoom="zoom" :center="center">
      <l-tile-layer :url="baseTileLayerUrl" :attribution="baseTileLayerAttribution" />
      <l-tile-layer :url="overlay" :attribution="overlayAttribution" />
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
//https://www.gbif.org/developer/maps
export default {
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 3,
      center: [30, 20],
      baseTileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      baseTileLayerAttribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      overlay: '',
      overlayAttribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      selectedStyle: 'purpleYellow.point',
    };
  },
  setup() {
    const route = useRoute();
    const selectedStyle = ref('purpleYellow.point');
    
    console.log(selectedStyle)
    // Logic to set map style based on route or other conditions
    const mapStyle = selectedStyle.value;
    // Constructing params string
    console.log(mapStyle)
    const params = [
      { name: 'style', value: mapStyle },
      { name: 'taxonKey', value: route.query.taxonKey },
      { name: 'country', value: route.query.country },
    ]
      .filter(param => Boolean(param.value))
      .map(param => `${param.name}=${param.value}`)
      .join('&');
      
    // Constructing overlay URL
    const overlay = `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?${params}`;

    return {
      overlay,
    };
  },
};
</script>

<style>
.container {
  position: relative;
  flex: 1;
}
.leaflet {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
