import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponenet from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid'
import NavBar from "../../../app/layout/NavBar";

export default observer(function ActivityForm(){
    const navigate = useNavigate();
    const {activityStore} = useStore();
    const {id} =useParams<{id: string}>();
    const {loading,updateActivity,createActivity,loadActivity,loadingInitial} =activityStore;

    const[activity,setActivity] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });
    
    
    useEffect(()=>{
        if(id) {
            loadActivity(id).then(activity=> setActivity(activity!));
        } else {
            setActivity({ id: '',
            title: '',
            date: '',
            description: '',
            category: '',
            city: '',
            venue: ''});
        }
    },[id,loadActivity]);

    
    function handleSubmit()
    {
        console.log(activity);
        if(activity.id.length===0){
            let newActivity ={
                ...activity,id:uuid()
            };
            createActivity(newActivity).then(()=>navigate(`/activites/:${newActivity.id}`));
        }else{
            updateActivity(activity).then(()=>navigate(`/activites/:${activity.id}`));
        }
    }
    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        const{name, value}=event.target;
        setActivity({...activity,[name]:value});
    }
    if (loadingInitial) return <LoadingComponenet content="Loading activity...."></LoadingComponenet>
    return(
        <>
          <NavBar/>
          <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder='Category' value={activity.category} name='category'  onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder='Date' type='date' value={activity.date} name='date' onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}></Form.Input>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/activites' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
        </>
       
    );
})