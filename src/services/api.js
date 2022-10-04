import axios from 'axios';

const api = axios.create({
    baseURL:'https://api-studychat.azurewebsites.net/',
}); 

export default api;