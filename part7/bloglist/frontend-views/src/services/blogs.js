import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async updateObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(`${baseUrl}/${updateObject.id}`, updateObject, config)
    return response.data
}

const addComment = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(`${baseUrl}/${newObject.blog}/comments`, newObject, config)
    return response.data
}

const remove = async deleteObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${deleteObject.id}`, config)
    return response.data
}

export default { setToken, getAll, create, update, remove, addComment }