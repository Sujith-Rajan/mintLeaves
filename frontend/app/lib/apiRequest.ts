import axios from 'axios'

const apiRequest = axios.create({
    baseURL:`${process.env.BASE_URL}/api`,
    withCredentials: true,
})

export default apiRequest