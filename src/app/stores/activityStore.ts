import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid'


export default class ActivityStore{
   // activites : Activity[] =[]; //Array Form
    activityRegistery =  new Map<string, Activity>();//Key value pair form
    selectedActivity: Activity | undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial=true;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate()
    {
        return Array.from(this.activityRegistery.values()).sort(
            (a,b)=>Date.parse(a.date) -Date.parse(b.date));
    }

    loadActivites= async ()=>{
      //  this.setLoadingInitial(true);
        try{
            const activites = await agent.Activites.list();
         /*   runInAction(()=>{
                activites.forEach(activity=>{
                    activity.date = activity.date.split('T')[0];
                    this.activites.push(activity);
                    })
                    this.loadingInitial=false;
            });*/
            activites.forEach(activity=>{
                activity.date = activity.date.split('T')[0];
               // this.activites.push(activity);
               this.activityRegistery.set(activity.id, activity);
                });
            this.setLoadingInitial(false);

           
        }
        catch(error){
            console.log(error);
            //runInAction(()=>{ this.loadingInitial=false;});
            this.setLoadingInitial(false);
        }
    }
    setLoadingInitial=(state:boolean)=>{
        this.loadingInitial=state;
    }

    selectActivity=(id:string)=>{
       // this.selectedActivity=this.activites.find(x=>x.id === id);//Array form
       this.selectedActivity=this.activityRegistery.get(id);
    }
    
    cancelSelectedActivity=()=>
    {
        this.selectedActivity=undefined;
    }
    openForm=(id?:string)=>{
        id?this.selectActivity(id):this.cancelSelectedActivity();
        this.editMode=true;
    }
    closeForm=()=>
    {
        this.editMode=false;
    }

    createActivity=async(activity:Activity)=>{
        this.loading=true;
        activity.id=uuid();
        try{
            await agent.Activites.create(activity);
            runInAction(()=>{
               // this.activites.push(activity);
               this.activityRegistery.set(activity.id, activity);
                this.selectedActivity=activity;
                this.loading=false;
                this.editMode=false;
            })

        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }

    }

    updateActivity=async(activity:Activity)=>{
        this.loading=true;
        try{
            await agent.Activites.update(activity);
            runInAction(()=>{
               // this.activites = [...this.activites.filter(x=>x.id!==activity.id), activity];
               this.activityRegistery.set(activity.id, activity);
                this.selectedActivity=activity;
                this.loading=false;
                this.editMode=false;
            })

        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

    deleteActivity=async(id:string)=>{
        this.loading=true;
        try{
            await agent.Activites.delete(id);
            runInAction(()=>{
              //  this.activites = [...this.activites.filter(x=>x.id!==id)];
              this.activityRegistery.delete(id);
                if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading=false;
            })

        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
}