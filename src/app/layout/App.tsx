import { Fragment}  from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activites/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activites/form/ActivityForm';
import ActivityDetails from '../../features/activites/details/ActivityDetails';


function App() {
  return (
    <Fragment>
     
     <Container style={{marginTop:'7em'}}>
        <Routes>
            <Route path='/' element ={<HomePage/>}/>
            <Route path='/activites' element ={<ActivityDashboard/>}/>
            <Route path='/activites/:id' element ={<ActivityDetails/>}/>
            <Route path='/createActivity' element ={<ActivityForm/>}/>
            <Route path='/manage/:id' element ={<ActivityForm/>}/>
          </Routes>
      </Container>
    </Fragment>
  );
}

export default observer(App);