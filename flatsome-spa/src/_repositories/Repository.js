import axios from "axios";

const baseDomain = "https://gumistore.herokuapp.com";
const baseURL = `${baseDomain}/api`;
const withCredentials = true;
const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        withCredentials,
    },
});

export default  instance;
