<template>
  <div class="city-table">
    <table class="city-data">
      <thead>
        <tr>
          <th class="header-cell">Land</th>
          <th class="header-cell">Steden</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cities, country) in cityData" :key="country" class="data-row">
          <td class="country-cell">{{ country }}</td>
          <td class="city-cell">
            <ul class="city-list">
              <li v-for="city in cities" :key="city" class="city-item">
                <a :href="`/map?city=${city}`" class="city-link">{{ city }}</a>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script>
  import { cityData } from '../assets/list/CityList';
  export default {
    data() {
      return {
        cityData: cityData,


      };
    }
  };
  </script>
  
  <style>
/* Aangepaste stijlen voor de tabel met steden en landen */

.city-table {
  margin-top: 20px;
}

.city-data {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

.header-cell {
  padding: 12px 16px;
  text-align: left;
  background-color: #f2f2f2;
}

.data-row {
  border-bottom: 1px solid #ccc;
}

.country-cell,
.city-cell {
  padding: 10px 16px;
}

.city-list {
  margin: 0;
  padding: 0;
}

.city-item {
  margin-bottom: 5px;
}

.city-link {
  text-decoration: none;
  color: #3498db;
}

.city-link:hover {
  text-decoration: underline;
  color: #21618c;
}
</style>
  