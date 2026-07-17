import axios from "axios"

const axiosClient =  axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://codearena-production-1e7e.up.railway.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

