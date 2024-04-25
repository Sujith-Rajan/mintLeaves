import axios from 'axios'

const apiRequest = axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_BASE_URL}/api`,
    withCredentials: true,
})

export default apiRequest