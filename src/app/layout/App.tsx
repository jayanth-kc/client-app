import React,{useEffect, Fragment}  from 'react';
import { Container } from 'semantic-ui-react'
//import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activites/dashboard/ActivityDashboard';
//import {v4 as uuid} from 'uuid'
//import agent from '../api/agent';
import LoadingComponenet from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
const {activityStore} = useStore();
//const[activites ,setActivites] = useState<Activity[]>([]);
//const[selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
//const[editMode, setEditMode] = useState(false);
//const[loading, setLoading]=useState(true);
//const[submitting, setSubmitting]=useState(false);


useEffect(()=>{
 // axios.get<Activity[]>("https://localhost:5001/api/Activities").then(response=>{
 //   console.log(response.data);
 //   setActivites(response.data);
 // })
//    agent.Activites.list().then(response=>{
       //console.log(response);
        //let activites:Activity[]=[];
        //response.forEach(activity=>{
            //activity.date = activity.date.split('T')[0];
            //activites.push(activity);
        //});
     //   setActivites(activites);
      //  setLoading(false);
        //})
        activityStore.loadActivites();
},[activityStore]);

/*function handleSelectActivity(id:string)
{
  setSelectedActivity(activites.find(x=>x.id === id));
}
function handleCancelSelectActivity()
{
  setSelectedActivity(undefined);
}
function handleFormOpen(id?:string){
  id?handleSelectActivity(id):handleCancelSelectActivity();
  setEditMode(true);
}
function handleFormClose()
{
  setEditMode(false);
}
function handleCreateOrEditActivity(activity:Activity){
  setSubmitting(true);
  if (activity.id){
    agent.Activites.update(activity).then(
      ()=>{
        setActivites([...activites.filter(x=>x.id !== activity.id), activity])   
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      }
    )
  }else{
    activity.id= uuid();
    agent.Activites.create(activity).then(
      ()=>{
        setActivites([...activites, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      }
    )
  }
//  activity.id ? 
//    setActivites([...activites.filter(x=>x.id !== activity.id), activity]) :
//    setActivites([...activites, {...activity, id:uuid()}]);
//    setEditMode(false);
//    setSelectedActivity(activity);
    
}
function handleDeleteActivity(id:string)
{
  setSubmitting(true);
  agent.Activites.delete(id).then(()=>{
    setActivites([...activites.filter(x=>x.id !==id)]);
    setSubmitting(false);
  });
 // setActivites([...activites.filter(x=>x.id !==id)])
}*/

if(activityStore.loadingInitial) return <LoadingComponenet content='Loading App' />

  return (
    <Fragment>
      <NavBar/>
     <Container style={{marginTop:'7em'}}>
          <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);
/* <Container style={{marginTop:'7em'}}>
          <ActivityDashboard activites={activites}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          />*/