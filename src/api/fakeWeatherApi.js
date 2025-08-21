
const delay = (ms = 500) => new Promise(res => setTimeout(res, ms));

const cities = [
  { id: 1, name: "Chennai", country: "IN" },
  { id: 2, name: "Bengaluru", country: "IN" },
  { id: 3, name: "Delhi", country: "IN" },
  { id: 4, name: "Mumbai", country: "IN" },
  { id: 5, name: "Coimbatore", country: "IN" },
];

const icons = ["☀️ Sunny", "⛅ Partly Cloudy", "☁️ Cloudy", "🌧️ Rain", "🌩️ Thunderstorm", "🌫️ Mist"];

function randomTemp() {
  return Math.round(25 + Math.random() * 10); // 25–35 °C
}

export async function searchCities(query) {
  await delay();
  return cities.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
}

export async function getCurrentWeather(cityName) {
  await delay();
  return {
    city: cityName,
    temp: randomTemp(),
    feelsLike: randomTemp(),
    humidity: Math.floor(40 + Math.random() * 50),
    wind: (2 + Math.random() * 6).toFixed(1),
    description: icons[Math.floor(Math.random() * icons.length)]
  };
}

export async function getDailyForecast(cityName) {
  await delay();
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push({
      date: new Date(Date.now() + i * 86400000).toDateString(),
      min: randomTemp() - 3,
      max: randomTemp() + 3,
      description: icons[Math.floor(Math.random() * icons.length)]
    });
  }
  return { city: cityName, forecast: days };
}
