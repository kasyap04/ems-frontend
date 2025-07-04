import ApiService from "../service/apiService";

export const getProfileData = async () => {
    try{
        const profile = await ApiService.get({
            path: 'profile/'
        }) ;

        return profile ;
    } catch(e){
        console.log(e);
        
        return false ;
    }
} ;



export const getAllEmployee = async (formId) => {
    try{
        const result = await ApiService.get({
            path: `form/records/${formId}`
        }) ;
        return result ;
    } catch(e){
        console.log(e);
        return [] ;
    }
} ; 