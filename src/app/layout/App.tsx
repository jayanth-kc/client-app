import { Fragment}  from 'react';
import { Container } from 'semantic-ui-react'
import ActivityDashboard from '../../features/activites/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activites/form/ActivityForm';
import ActivityDetails from '../../features/activites/details/ActivityDetails';
import 'react-calendar/dist/Calendar.css';


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