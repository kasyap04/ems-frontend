import ApiService from "../service/apiService";
import { REFRESH_TOKEN } from "../constant/config";

export const login = async (creds) => {
    try{
        const result = await ApiService.post({
            path: "auth/login/",
            data: creds
        }) ;

        if(result?.refresh_token){
            localStorage.setItem(REFRESH_TOKEN, result.refresh_token) ;
        }
        return [true, ""] ;
    } catch(e) {
        console.log(e);
        return [false, e.response.data?.detail] ;
    }
} ;



export const register = async (creds) => {
    try{
        const result = await ApiService.post({
            path: "auth/register/",
            data: creds
        }) ;

        if(result?.refresh_token){
            localStorage.setItem(REFRESH_TOKEN, result.refresh_token) ;
        }
        return [true, ""] ;
    } catch(e) {
        console.log(e);
        return [false, e.response.data?.error] ;
    }
} ;