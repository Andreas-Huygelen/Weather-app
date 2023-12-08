export const cityData: city = {
    'België': ['Mortsel', 'Antwerpen', 'Mechelen', 'Brussel', 'Gent', 'Leuven'],
    'USA': ['Alabama', 'Florida', 'New York', 'Texas', 'California', 'Washington', 'Illinois', 'Arizona', 'Georgia', 'Oregon'],
    'Engeland': ['Londen', 'Manchester', 'Liverpool', 'Birmingham', 'Leeds', 'Oxford'],
    'Italië': ['Milan', 'Florence', 'Venice', 'Naples', 'Rome', 'Turin', 'Bologna', 'Verona'],
    'Duitsland': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart'],
    'Nederland': ['Amsterdam', 'Rotterdam', 'Utrecht', 'The Hague', 'Eindhoven'],
    'Frankrijk': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  }

  interface city {
        [country: string]: string[];
  }