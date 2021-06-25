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
        Accept: 'application/json, text/javascript',
        'Content-Type': 'application/json/x-www-form-urlencoded; charser=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${token}`,
        credentials: 'include',
        withCredentials,
    },
    mode: 'cords',
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