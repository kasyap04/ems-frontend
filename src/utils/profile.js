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