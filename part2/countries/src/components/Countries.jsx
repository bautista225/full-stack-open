const Countries = ({ countries, handleShowCountry }) => 
    countries.map(country => (
        <div key={country.name.common}>{country.name.common} <button value={country.name.common} onClick={handleShowCountry}>show</button></div>
    )
)

export default Countries