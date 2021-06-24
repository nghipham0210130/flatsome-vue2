import axios from "axios";
import { router } from "../router/routes";
import store from "../store";

const baseDomain = "https://gumistore.herokuapp.com";
const baseURL = `${baseDomain}/api`;
const withCredentials = true;
const token = localStorage.getItem('admin__token');

const instance = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        withCredentials,
    },
});

instance.interceptors.response.use(undefined, function (error) {
    if (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            store.dispatch("logout");
            return router.push("/Admin/Login");
        }
    }
})


export default  instance;