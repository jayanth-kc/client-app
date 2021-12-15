import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

axios.defaults.baseURL = "https://localhost:5001/api"

const resposeBody =<T> (response:AxiosResponse<T>) => response.data;

const sleep = (delay:number) => {
    return new Promise(
        (resolve)=>{
            setTimeout(resolve,delay);
        }
    );
}

axios.interceptors.response.use(
    async response =>{
        try {
            await sleep(1000);
            return response;
        } catch (error) {
            console.log(error);
            return await Promise.reject(error);
        }
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

const agent = {
    Activites   
}

export default agent;