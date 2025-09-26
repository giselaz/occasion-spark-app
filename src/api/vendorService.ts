import { Vendor } from "@/types/event";
import { axiosInstance } from "@/lib/utils";
import axios,{ AxiosResponse} from "axios";
import { Error } from "@/types/event";
import { Success } from "@/types/event";

export const createVendor = async(data:Partial<Vendor>) =>{
    try{
        const response: AxiosResponse<Success>  = await axiosInstance.post('/vendors/new',{
                data
            });
        return response;
    }catch(err)
    {
        const error:Error = {error:''};
        if(axios.isAxiosError(err))
        {
            error.error = err.response?.data?.message;
        }else{
            error.error = "Unexcepcted Error";
        }
        return error;
    }
    
}