import axios from "axios";

let apiInstance = axios.create({
    baseURL: "http://localhost:3001"
});


export const api = apiInstance;
