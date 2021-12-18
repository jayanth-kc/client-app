import { observer } from "mobx-react-lite";
import {  useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import LoadingComponenet from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid'
import NavBar from "../../../app/layout/NavBar";
import { Formik } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { CategoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";

export default observer(function ActivityForm(){
    const navigate = useNavigate();
    const {activityStore} = useStore();
    const {id} =useParams<{id: string}>();
    const {loading,updateActivity,createActivity,loadActivity,loadingInitial} =activityStore;

    const validationSchema = Yup.object({
        title:Yup.string().required("Activity Title is required"),
        date:Yup.string().required("Activity date is required").nullable(),
        description:Yup.string().required("Activity description is required"),
        category:Yup.string().required("Activity category is required"),
        city:Yup.string().required("Activity city is required"),
        venue:Yup.string().required("Activity venue is required"),
    });
    const[activity,setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
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
            date: null,
            description: '',
            category: '',
            city: '',
            venue: ''});
        }
    },[id,loadActivity]);

    
    function handleFormSubmit(activity: Activity)
    {
        console.log(activity);
        if(activity.id.length===0){
            let newActivity ={
                ...activity,id:uuid()
            };
            createActivity(newActivity).then(()=>navigate(`/activites/${newActivity.id}`));
        }else{
            updateActivity(activity).then(()=>navigate(`/activites/${activity.id}`));
        }
    }
   /* function handleChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        const{name, value}=event.target;
        setActivity({...activity,[name]:value});
    }*/
    if (loadingInitial) return <LoadingComponenet content="Loading activity...."></LoadingComponenet>
    return(
        <>
          <NavBar/>
          <Segment clearing>
              <Header content='Activity Details' sub color="teal" />
              <Formik validationSchema={validationSchema}
              enableReinitialize initialValues={activity} onSubmit={values=> handleFormSubmit(values)}>
                {({
                     handleSubmit, isSubmitting,isValid,dirty
                })=>(
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                   
                    <MyTextInput placeholder='Title' name='title' />
                    <MyTextArea row={3} placeholder='Description'  name='description' />
                    <MySelectInput option={CategoryOptions} placeholder='Category'  name='category' />
                    <MyDateInput placeholderText='Date' name='date' showTimeSelect timeCaption='time' dateFormat='MMMM d yyyy h:mm aa' />
                    <Header content='Location Details' sub color="teal" />
                    <MyTextInput placeholder='City' name='city' />
                    <MyTextInput placeholder='Venue'  name='venue' />
                    <Button disabled={isSubmitting || !isValid || !dirty} 
                    loading={loading} floated='right' positive type='submit' content='Submit' />
                    <Button as={Link} to='/activites' floated='right' type='button' content='Cancel' />
                </Form>
                )}
              </Formik>
           
        </Segment>
        </>
       
    );
})

/* <FormMyTextInput>
                        <MyTextInput placeholder='Title' name='title' ></MyTextInput>
                        <ErrorMessage name="title" render={error=><Label basic colo='red' content={error}/>}/>
                    </FormMyTextInput>*/