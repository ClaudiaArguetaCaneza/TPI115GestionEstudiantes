import axios from "axios";

//apply base url for axios
const BASE_URL= import.meta.env.VITE_APP_BASE_URL;


const axiosApi = axios.create({
  baseURL: BASE_URL,
});



axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("intercepte: ",error);
    if(error.response.status == 401){
      NavigateLogout();
    }
  }
);

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}


function NavigateLogout(){
 window.localtion.ref="/logout";
}
