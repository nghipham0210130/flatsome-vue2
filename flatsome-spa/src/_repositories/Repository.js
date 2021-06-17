import axios from "axios";

const baseDomain = "https://gumistore.herokuapp.com";
const baseURL = `${baseDomain}/api`;
const token = localStorage.getItem('token');


export default axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
    }
})