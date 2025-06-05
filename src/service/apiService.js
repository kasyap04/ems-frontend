import axios from 'axios';
import { AUTH_TOKEN, REFRESH_TOKEN, API_BASE_URL } from '../constant/config';
import { refreshToken } from '../utils/auth';


const ApiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    }
});



const TOKEN_PAYLOAD_KEY = 'Authorization';



ApiClient.interceptors.request.use((config) => {    
    const jwtToken = localStorage.getItem(AUTH_TOKEN);
    
    if (!config.headers) {
        config.headers = {};
    }
    if (jwtToken) {
        config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
    } else {
        // window.location.reload();
    }

    return config;
    }, error => {

    Promise.reject(error);
});


let TEST = null ;


const manageRefreshToken = (originalRequest) => {
  const refresh = localStorage.getItem(REFRESH_TOKEN);
  TEST = 1 ;

  console.log('refresh = ', refresh);
  
  
  if(refresh){
    return refreshToken(refresh).then((resp) => {
      console.log('resp.access_token = ', resp.access_token);
      
      if (resp.access_token) {
        originalRequest.headers.Authorization = `Bearer ${resp.access_token}`;

        const request = ApiClient(originalRequest);
        ApiClient.defaults.headers.common.Authorization = `Bearer ${resp.access_token}`;
        localStorage.setItem(AUTH_TOKEN, resp.access_token);
        return request;
      }
      localStorage.removeItem(AUTH_TOKEN);
      // window.location.reload();
      return Promise.reject(error);
    }).catch((e) => {
      console.log(';ERRRR', e);
      
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      // window.location.href = "/login"
    }
    ) ;
  }
  localStorage.removeItem(AUTH_TOKEN);
  window.location.href = "/login";
} ;



ApiClient.interceptors.response.use((response) => response.data, (error) => {
    const originalRequest = error.config;
    

    if (error.response?.status === 401) {
      const errorDetail = error.response?.data ;
      const errorMessage = errorDetail?.messages ;

      console.log('errorDetail = ', errorDetail);
      


      console.log('errorDetail = ', errorDetail?.detail, errorDetail?.detail === 'token_expired');
      if(errorDetail?.detail === 'token_expired' || errorDetail?.detail === 'invalid_token'){
        manageRefreshToken(originalRequest) ;
        if(TEST == null){
          TEST = 1
        }
      } else {
        localStorage.removeItem(AUTH_TOKEN);
        // window.location.reload();
        return Promise.reject(error);
      }
      

      if(errorDetail?.code === "token_not_valid" && (errorMessage && errorMessage[0]?.token_type == "access")){
        manageRefreshToken(originalRequest) ;
        if(TEST == null){
          TEST = 1
        }
      } else {
        localStorage.removeItem(AUTH_TOKEN);
        // window.location.reload();
        return Promise.reject(error);
      }

      // if (errorDetail?.code === "ACCESS_TOKEN_EXPIRED") {
      //   const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      //   if (refreshToken) {
      //     return refreshTokenService(refreshToken).then((resp) => {
      //       if (resp.access_token) {
      //         originalRequest.headers.Authorization = `Bearer ${resp.access_token}`;
      //         const request = ApiClient(originalRequest);
      //         ApiClient.defaults.headers.common.Authorization = `Bearer ${resp.access_token}`;
      //         localStorage.setItem(AUTH_TOKEN, resp.access_token);
      //         return request;
      //       }
      //       localStorage.removeItem(AUTH_TOKEN);
      //       // window.location.reload();
      //       return Promise.reject(error);
      //     });
      //   }
      //   localStorage.removeItem(AUTH_TOKEN);
      //   // window.location.reload();
      // }
      // else{
      //   localStorage.removeItem(AUTH_TOKEN);
      //   // window.location.reload();
      //   return Promise.reject(error);
      // }
  
    }
    return Promise.reject(error);
});
  



  const ApiService = {
    post: ({path, data = null, headers = null}) => ApiClient.post(path, data ?? {}, headers ? { headers } : null),
    delete: ({ path, data = null, headers = null }) => ApiClient.delete(path, { data: data ?? {}, ...(headers ? { headers } : {}) }),
    get: ({path, data = null}) => ApiClient.get(path, data ?? {})
} ;

export default ApiService ;