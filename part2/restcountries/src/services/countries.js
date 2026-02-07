import axios from "axios";

const countriesUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";

const findCountries = (filter) => axios.get(countriesUrl).then((request) => request.data.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())));

const capitalWeather = (country) =>
  axios.get(`${openWeatherUrl}?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`).then(response => response.data);
;

export default {
  findCountries,
  capitalWeather,
};
