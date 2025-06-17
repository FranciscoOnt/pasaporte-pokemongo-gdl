import axios from 'axios';
import { API_URL } from './constants';

const api = axios.create({
    baseURL: API_URL,
    timeout: 3000,
    withCredentials: true
});

export async function getUserProfile() {
    return (await api.get('/profile')).data
}
