import ApiService from "../service/apiService";
import { REFRESH_TOKEN, AUTH_TOKEN } from "../constant/config";

export const login = async (creds) => {
    try{
        const result = await ApiService.post({
            path: "auth/login/",
            data: creds
        }) ;

        if(result?.refresh_token){
            localStorage.setItem(REFRESH_TOKEN, result.refresh_token) ;
        }
        if(result?.access_token){
            localStorage.setItem(AUTH_TOKEN, result.access_token) ;
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
        if(result?.access_token){
            localStorage.setItem(AUTH_TOKEN, result.access_token) ;
        }
        return [true, ""] ;
    } catch(e) {
        console.log(e);
        return [false, e.response.data?.error] ;
    }
} ;


export const refreshToken = async (refresh) => {
    return ApiService.post({
        path: 'auth/refresh/',
        data: {refresh}
    })
} ;


export const changePassword = async (payload) => {
    try{
        const result = await ApiService.post({path: "auth/change-password", data: payload}) ;
        return [true, result?.message] ;
    }catch(e){
        console.log(e);
        
        return [false, e.response?.data?.error] ;
    }
} ;



export const createForm = async (payload) => {
    try{
        const result = await ApiService.post({
            path: 'form/forms/',
            data: payload
        }) ;
        return true
    }catch(e){
        console.log(e);
        return false ;
    }
} ;


export const getCreatedForm = async () => {
    try{
        const result = await ApiService.get({
            path: 'form/forms/all/',
            data: {title: "cust_form"}
        }) ;
        return result
    }catch(e){
        console.log(e);
        return false ;
    }
} ;



export const registerEmployee = async (payload) => {
    try{
        const result = await ApiService.post({
            path: "form/records/",
            data: payload
        }) ;

        console.log(result);
        return true ;
    } catch(e){
        console.log(e);
        return false ;
    }
} ;



export const deleteEmployee = async (empId) => {
    try{
        const result = await ApiService.delete({
            path: `form/records/delete/${empId}/`
        }) ;

        console.log('delete = ',  result);
        return true ;
    } catch(e){
        console.log(e);
        return false ;
    }
} ;