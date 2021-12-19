import { Container } from 'semantic-ui-react'
import ActivityDashboard from '../../features/activites/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activites/form/ActivityForm';
import ActivityDetails from '../../features/activites/details/ActivityDetails';
import 'react-calendar/dist/Calendar.css';
import TestErrors from '../../features/errors/TestError';
import { Fragment, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import LoginForm from '../../features/Users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponenet from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';


function App() {
  const {commonstore,userStore} = useStore();
  useEffect(()=>{
    if(commonstore.token){
      userStore.getUser().finally(()=>commonstore.setAppLoaded());
    }
    else{
      commonstore.setAppLoaded();
    }
  },[commonstore,userStore]);

  if(!commonstore.appLoaded) return <LoadingComponenet content='Loading.....' />
  
  return (
    <Fragment>
     <ToastContainer position="bottom-right" hideProgressBar/>
     <ModalContainer />
    <Container style={{marginTop:'7em'}}>
       <Routes>
           <Route path='/' element ={<HomePage/>}/>
           <Route path='/activites' element ={<ActivityDashboard/>}/>
           <Route path='/activites/:id' element ={<ActivityDetails/>}/>
           <Route path='/createActivity' element ={<ActivityForm/>}/>
           <Route path='/manage/:id' element ={<ActivityForm/>}/>
           <Route path='/errors' element ={<TestErrors/>}/>
           <Route path='/login' element ={<LoginForm/>}/>
           <Route path='/buggy/not-found' element ={<NotFound/>}/>
           <Route path='*' element ={<NotFound/>}/>
         </Routes>
     </Container>
   </Fragment>
  
  );
}

export default observer(App);