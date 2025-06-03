import axios from 'axios';
import { AUTH_TOKEN, REFRESH_TOKEN, API_BASE_URL } from '../constant/config';


const ApiClient = axios.create({
    baseURL: "http://0.0.0.0:8000/",  // API_BASE_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    }
});



const TOKEN_PAYLOAD_KEY = 'Authorization';
const PUBLIC_REQUEST_KEY = 'public-request';


ApiClient.interceptors.request.use((config) => {
    // console.log('config = ', config);
    
    const jwtToken = localStorage.getItem(AUTH_TOKEN);
    if (!config.headers) {
        config.headers = {};
    }
    if (jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
        config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
    }
    if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
        // window.location.reload();
    }
    return config;
    }, error => {

    Promise.reject(error);
});



ApiClient.interceptors.response.use((response) => response.data, (error) => {
    const originalRequest = error.config;
    

    if (error.response?.status === 401) {
      const errorDetail = error.response?.detail;

      if (errorDetail?.code === "REFRESH_TOKEN_EXPIRED") {
        localStorage.removeItem(AUTH_TOKEN);
        // window.location.reload();
        return Promise.reject(error);
      }

      if (errorDetail?.code === "ACCESS_TOKEN_EXPIRED") {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (refreshToken) {
          return refreshTokenService(refreshToken).then((resp) => {
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
          });
        }
        localStorage.removeItem(AUTH_TOKEN);
        // window.location.reload();
      }
      else{
        localStorage.removeItem(AUTH_TOKEN);
        // window.location.reload();
        return Promise.reject(error);
      }
  
    }
    return Promise.reject(error);
});
  



  const ApiService = {
    post: ({path, data = null, headers = null}) => ApiClient.post(path, data ?? {}, headers ? { headers } : null),
    delete: ({ path, data = null, headers = null }) => ApiClient.delete(path, { data: data ?? {}, ...(headers ? { headers } : {}) }),
    get: ({path, data = null}) => ApiClient.get(path, data ?? {})
} ;

export default ApiService ;