import axios from "axios";
import { router } from "../router/routes";
import store from "../store";

const baseDomain = "https://gumistore.herokuapp.com";
const baseURL = `${baseDomain}/api`;
const withCredentials = true;
const token = localStorage.getItem('admin__token');
const adminHeader = token ? { 'Authorization': 'Bearer ' + token } : {};

const instance = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'X-Requested-With': 'XMLHttpRequest',
        ...adminHeader,
        withCredentials,
    },
    // mode: 'cords',
    cache: 'default',
});

instance.interceptors.response.use(undefined, function (error) {
    if (error) {
        if (error.response.status === 401) {
            store.dispatch("logout");
            return router.push("/Admin/Login");
        }
    }
})
export default  instance;