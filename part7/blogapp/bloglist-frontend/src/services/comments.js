import axios from 'axios'
const baseUrl = '/api/comment'
import utilService from './utils.js'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getBlogComments = async (id) => {
    const response = await axios.get(`${baseUrl}/blog/${id}`)
    return response.data
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: utilService.getToken() },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: utilService.getToken() },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { getAll, create, remove, getBlogComments }

