import axios from 'axios'

const apiRequest = axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':process.env.NEXT_PUBLIC_ORGIN_URL
    },
    withCredentials: true,
    
})

export default apiRequest