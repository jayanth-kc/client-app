import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity } from "../models/activity";
//import { useNavigate } from "react-router-dom";
import { history } from "../..";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import { config } from "process";

axios.defaults.baseURL = "https://localhost:5001/api"

const resposeBody =<T> (response:AxiosResponse<T>) => response.data;

const sleep = (delay:number) => {
    return new Promise(
        (resolve)=>{
            setTimeout(resolve,delay);
        }
    );
};

axios.interceptors.request.use(config=>{
    const token =  store.commonstore.token;
    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    if (token) config.headers.Authorization  = `Bearer ${token}` ;
    return config;
});



axios.interceptors.response.use(
   /* async response =>{
        try {
            await sleep(1000);
            return response;
        } catch (error) {
            console.log(error);
            return await Promise.reject(error);
        }
    }*/
    async response =>{     
            await sleep(1000);
            return response;
        },(error: AxiosError)=>{
       //     const navigate = useNavigate();
            const{data,status}=error.response!;
            switch(status){
                case 400:
                    toast.error('bad request'+ data.error);
                    break;
                case 401:
                    toast.error('unauthorized');
                    break;
                case 404:
                    toast.error('not found');
                   history.push('/');
                 // navigate('/notfoud');
                    break;
                case 500:
                    toast.error('server error');
                    break;
            }
            return Promise.reject(error);
        }
    );

const requests = {
    get:<T>(url:string)=>axios.get<T>(url).then(resposeBody),
    post:<T>(url:string,body:{})=>axios.post<T>(url, body).then(resposeBody),
    put:<T>(url:string, body:{})=>axios.put<T>(url,body).then(resposeBody),
    delete:<T>(url:string)=>axios.delete<T>(url).then(resposeBody),
}

const Activites = {
    list:()=>requests.get<Activity[]>('/Activities'),
    details:(id:string)=>requests.get<Activity>(`/Activities/${id}`),
    create:(activity:Activity)=>requests.post<void>('/Activities',activity),
    update:(activity:Activity)=>requests.put<void>(`/Activities/${activity.id}`,activity),
    delete:(id:string)=>requests.delete<void>(`/Activities/${id}`),
}

const Account ={
    current:()=> requests.get<User>('/account'),
    login:(user:UserFormValues)=> requests.post<User>('/account/login',user),
    register:(user:UserFormValues)=> requests.post<User>('/account/register',user),
}

const agent = {
    Activites,
    Account
}

export default agent;