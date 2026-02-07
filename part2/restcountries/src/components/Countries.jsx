import { useEffect, useState } from "react";
import countryService from "../services/countries.js";

const Countryℕame = ({ country }) => {
  const [showView, setShowView] = useState(false);
  return <div>
    {country.name.common}
    <button onClick={() => setShowView(!showView)}>Show</button>
    {showView ? <CountryView country={country} /> : ""}
  </div>;
};

const CountryView = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.capitalWeather(country).then(weather =>
      setWeather(weather)
    );
  }, [country]);

  return <>
    <h1>{country.name.common}</h1>
    <p>
      {country.capital.length === 1 ? "Capital: " : "Capitals: "}
      {country.capital.map((capital, index) => index == 0 ? `${capital}` : `, ${capital}`)}
    </p>
    <p>Area: {country.area}</p>
    <h2>Languages</h2>
    <ul>
      {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
    </ul>
    <img src={country.flags.png} />
    <h2>Weather in {country.capital[0]}</h2>
    <p>Temperature: {weather === null ? "loading..." : `${weather.main.temp} Celsius`}</p>
    {weather === null ? "" : <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`} />}
    <p>Wind: {weather === null ? "loading..." : `${weather.wind.speed} m/s`}</p>
  </>;
};

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  return <>
    {countries.length === 1 ? <CountryView country={countries[0]} /> : countries.map((country, index) => <Countryℕame country={country} key={index} />)}
  </>
};

export default Countries;
