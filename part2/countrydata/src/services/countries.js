import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
    return axios.get(`${baseUrl}api/all`)
}

const getSpecific = (name) => {
    return axios.get(`${baseUrl}api/name/${name}`)
}

const getWeather = (country) => {
    const cityLatitude = country.capitalInfo.latlng[0]
    const cityLongitude = country.capitalInfo.latlng[1]
    const weatherAPIKey = import.meta.env.VITE_SOME_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&appid=${weatherAPIKey}&units=metric`
    return axios.get(url)
}

export default {
    getAll,
    getSpecific,
    getWeather

}