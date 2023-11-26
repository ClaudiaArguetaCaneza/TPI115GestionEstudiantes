import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
const useApiHelper=()=>{
    const navigate = useNavigate();

    const token = Cookies.get('token');
    const config_token = {
        headers: { Authorization: `Bearer ${token}` }
    };

    //apply base url for axios
    const BASE_URL= import.meta.env.VITE_APP_BASE_URL;
    const axiosApi = axios.create({
    baseURL: BASE_URL,
    });

    axiosApi.interceptors.response.use(
        (response) => response,
        (error) => {
            if(error.response.status == 401){
                _navigateLogout(error);
            }else{
                _handleError(error);
            }
        }
    );

    async function get(url, config=config_token){
        return await axiosApi
        .get(url, { ...config })
        .then((response) => response.data);
    }
    const post=async(url, data, config = config_token)=>{
        // console.log("a veeeer: ");
        // for(var pair of data.entries()) {
        //     console.log(pair[0]+', '+pair[1]);
        //   }

        if(data instanceof FormData && typeof data.append === 'function'){
            console.log("form data");
            return axiosApi
            .post(url, data, { ...config })
            .then((response) => response.data);
        }else{
            return axiosApi
            .post(url, { ...data }, { ...config })
            .then((response) => response.data);
        }
        
    }
    const put=async(url, data, config = config_token)=>{
        return await axiosApi
          .put(url, { ...data }, { ...config })
          .then((response) => response.data);
      }
    const del=async(url, config = config_token)=>{
        return await axiosApi
          .delete(url, { ...config })
          .then((response) => response.data);
      }
    
    const _navigateLogout=(error)=>{
        Swal.fire({
            title:"Sesión Caducada",
            icon:"error",
            text: error.response.data.message,
            confirmButtonText:"Aceptar"
        });
        navigate('/logout');
    }

    const _handleError=(error)=>{
        Swal.fire({
            title:"Error",
            icon:"error",
            text: error.response.data.message,
            confirmButtonText:"Aceptar"
        });
        console.log("Error: ",error);
    }

    return {get, post, put, del};

}

export default useApiHelper;