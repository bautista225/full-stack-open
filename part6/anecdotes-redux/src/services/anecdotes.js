import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (object) => {
    const response = await axios.post(baseUrl, object)
    return response.data
}

const change = async (object) => {
    const response = await axios.put(`${baseUrl}/${object.id}`, object)
    return response.data
}

export default { getAll, create, change }