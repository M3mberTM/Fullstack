import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
    return axios.get(`${baseUrl}api/all`)
}

const getSpecific = (name) => {
    return axios.get(`${baseUrl}api/name/${name}`)
}


export default {
    getAll,
    getSpecific,

}
