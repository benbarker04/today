import axios from "axios";

axios.defaults.baseURL = 'https://bens-today-project-api-0a7c2244176f.herokuapp.com/'
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;