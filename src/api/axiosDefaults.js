import axios from "axios";

axios.defaults.baseURL = "https://drf-api-walkthrough-18-b94666bc97ac.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;