import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponenet from "../../../app/layout/LoadingComponent";
import NavBar from "../../../app/layout/NavBar";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard(){
     const {activityStore} = useStore();
     const {activityRegistery} = activityStore;

useEffect(()=>{
          if(activityRegistery.size <=1)  activityStore.loadActivites();
},[activityRegistery,activityStore]);

if(activityStore.loadingInitial) return <LoadingComponenet content='Loading App' />

    return(
        <>
        <NavBar/>
        <Grid>
            <Grid.Column width='10'>
                <ActivityList></ActivityList>
            </Grid.Column>
            <Grid.Column width='6'>
               <ActivityFilters />
            </Grid.Column>
        </Grid>
        </>
        
    );
})