import axios from 'axios'
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather'
const api_key = import.meta.env.VITE_OPENWEATHERMAP_KEY

const get = (lat, lon) => {
    const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default { get }