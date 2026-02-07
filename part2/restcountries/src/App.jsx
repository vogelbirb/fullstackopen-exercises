import { useState } from 'react';
import Filter from './components/Search';
import Countries from './components/Countries';
import countryService from "./services/countries.js";

const App = () => {
  let [filter, setFilter] = useState("");
  let [countries, setCountries] = useState([]);

  const handleFilterChange = (event) => {
    let changedFilter = event.target.value;
    setFilter(changedFilter);

    if (changedFilter.len === 0) {
      return;
    }
    countryService.findCountries(changedFilter).then(countries => {
      setCountries(countries);
    });
  };

  return (
    <>
      <Filter value={filter} onChange={handleFilterChange} />

      <Countries countries={countries} />
    </>
  );
};

export default App;
