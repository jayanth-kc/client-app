import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

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
        this.setLoadingInitial(true);
        try{
            const activites = await agent.Activites.list();
        
            activites.forEach(activity=>{
                this.setActivity(activity);
                });
            this.setLoadingInitial(false);

           
        }
        catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string)=>{
        this.setLoadingInitial(true);
        let activity = this.getActivity(id);
        if(activity){
            this.selectedActivity=activity
            this.setLoadingInitial(false);
            return activity;
        } else{
            try{
                activity = await agent.Activites.details(id);
                this.setActivity(activity);
                runInAction(()=>{
                    this.selectedActivity=activity
                });                
                this.setLoadingInitial(false);
                return activity;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity=(activity:Activity)=>{
        activity.date = activity.date.split('T')[0];
        this.activityRegistery.set(activity.id, activity);
    }

    private getActivity=(id:string)=>
    {
        return this.activityRegistery.get(id);
    }

    setLoadingInitial=(state:boolean)=>{
        this.loadingInitial=state;
    }

      createActivity=async(activity:Activity)=>{
        this.loading=true;
        try{
            await agent.Activites.create(activity);
            runInAction(()=>{
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
              this.activityRegistery.delete(id);
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