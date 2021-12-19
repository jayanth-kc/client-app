import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import {  NavigateFunction } from "react-router-dom";


export default class UserStore{
    user: User|null=null;
   
    constructor(){
        makeAutoObservable(this);
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login= async (creds: UserFormValues,navigate:NavigateFunction ) =>{
        try{
            const user = await agent.Account.login(creds);
            store.commonstore.setToken(user.token);
            runInAction(()=> this.user=user);
            store.modalStore.closeModal();
            navigate('/activites');
            console.log(user);
        }catch(error)
        {
            throw error;
        }
    }

    register= async (register: UserFormValues,navigate:NavigateFunction ) =>{
        try{
            const user = await agent.Account.register(register);
            store.commonstore.setToken(user.token);
            runInAction(()=> this.user=user);
            store.modalStore.closeModal();
            navigate('/activites');
           // console.log(user);
        }catch(error)
        {
            throw error;
        }
    }

    logout =(navigate:NavigateFunction)=>{
        store.commonstore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user=null;
        navigate('/');

    }

    getUser = async ()=>{
        try{
            const user = await agent.Account.current();
            runInAction(()=> this.user=user);
        } catch(error){
            console.log(error);
        }
    }

}