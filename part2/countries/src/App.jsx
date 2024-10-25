import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails'
import countriesService from './services/countries'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const matchedCountries = (search) =>
    countries.filter(country => search !== '' ? country.name.common.toLowerCase().includes(search.toLowerCase()) : false)

  useEffect(() => {
    countriesService.getAll().then(countries => {
      setCountries(countries)
    })
  }, [])

  const handleSearchChange = (event) => setSearch(event.target.value)

  const handleShowCountry = (event) => setSearch(event.target.value)

  const getAppContent = (countries) => {
    if (countries.length > 10) {
      return <>Too many matches, specify another filter</>
    }
    else if (countries.length === 1) {
      return <CountryDetails country={countries[0]} />
    }
    else {
      return <Countries countries={countries} handleShowCountry={handleShowCountry}/>
    }
  }

  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      {getAppContent(matchedCountries(search))}
    </div>
  )
}

export default App
