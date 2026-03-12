import axios from "axios";

const api = axios.create({
    baseURL:"https://project-4-cqge.onrender.com/"
});

export default api;