import axios from "axios";

const baseDomain = "https://gumistore.herokuapp.com";
const baseURL = `${baseDomain}/api`;

export default axios.create({
    baseURL,
    headers: {"Authorization": "Bearer yourToken"}
})