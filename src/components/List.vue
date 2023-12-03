<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Land</th>
            <th>Steden</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cities, country) in cityData" :key="country">
            <td>{{ country }}</td>
            <td>
              <ul>
                <li v-for="city in cities" :key="city"><a :href="`/map?city=${city}`">{{ city }}</a></li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cityData: {
          'België': ['Mortsel', 'Antwerpen', 'Mechelen', 'Brussel', 'Gent', 'Leuven'],
          'USA': ['Alabama', 'Florida', 'New York', 'Texas', 'California', 'Washington', 'Illinois', 'Arizona', 'Georgia', 'Oregon'],
          'Engeland': ['Londen', 'Manchester', 'Liverpool', 'Birmingham', 'Leeds', 'Oxford'],
          'Italië': ['Milan', 'Florence', 'Venice', 'Naples', 'Rome', 'Turin', 'Bologna', 'Verona'],
          'Duitsland': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart'],
          'Nederland': ['Amsterdam', 'Rotterdam', 'Utrecht', 'The Hague', 'Eindhoven'],
          'Frankrijk': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
        },


      };
    }
  };
  </script>
  
  <style>
  /* Stijlen kunnen naar wens worden toegevoegd voor opmaak */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  