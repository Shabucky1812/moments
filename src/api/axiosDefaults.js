import axios from "axios";

axios.defaults.baseURL = "https://moments-react-walkthrough-18-f924318def49.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;