import Weather from "./Weather"

const Header = ({country}) => (
    <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
    </div>
)

const Languages = ({ languages }) => (
    <div>
        <h3>languages:</h3>
        <ul>
            {Object.values(languages).map(name => <li key={name}>{name}</li>)}
        </ul>
    </div>
)

const Flag = ({flagInfo}) => (
    <div>
        <img src={flagInfo.png} alt={flagInfo.alt}></img>
    </div>
)

const CountryDetails = ({ country }) => (
    <div>
        <Header country={country}></Header>
        <Languages languages={country.languages} />
        <Flag flagInfo={country.flags} />
        <Weather name={country.capital} lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]} />
    </div>
)

export default CountryDetails