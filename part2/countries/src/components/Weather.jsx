import weatherService from '../services/openWeatherMap'
import { useState, useEffect } from 'react'

const Temperature = ({temperature}) => <div>temperature {temperature} Celsius</div>
const WeatherIcon = ({iconName, iconDescription}) => <img src={`https://openweathermap.org/img/wn/${iconName}@2x.png`} alt={iconDescription} ></img>
const Wind = ({windSpeed}) => <div>wind {windSpeed} m/s</div>

const Weather = ({ name, lat, lon }) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => { weatherService.get(lat, lon).then(weather => setWeather(weather)) }, [])

    if (weather === null)
        return <></>

    return (
        <div>
            <h2>Weather in {name}</h2>
            <Temperature temperature={weather.main.temp} />
            <WeatherIcon iconName={weather.weather[0].icon} iconDescription={weather.weather[0].description} />
            <Wind windSpeed={weather.wind.speed} />
        </div>
    )
}

export default Weather