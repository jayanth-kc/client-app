import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import {  useNavigate } from "react-router-dom";
import * as Yup from 'yup';

export default observer(function RegisterForm(){
    const navigate = useNavigate();
    const {userStore} = useStore();
    return(
        <Formik 
        initialValues={{displayName:'',username:'', email:'',password:'',error:null}}
        onSubmit={(values, {setErrors})=> userStore.register(values,navigate).catch(error=>setErrors({error:error}))}
        validationSchema={Yup.object({
            displayName: Yup.string().required(),
            username: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
        })}
        >
            {({handleSubmit, isSubmitting,isValid,dirty,errors})=>(
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content="Register user for Reactivites" color="teal" textAlign="center" />
                    <MyTextInput placeholder='DisplayName' name='displayName' />
                    <MyTextInput placeholder='Username' name='username' />
                    <MyTextInput placeholder='Email' name='email' />
                    <MyTextInput placeholder='Password' name='password' type="Password" />
                    <ErrorMessage name='error' render={()=>
                    <Label style={{marginBottom:10}} basic color="red" content={errors.error}/>
                    
                    } />
                    <Button disabled={isSubmitting || !isValid || !dirty} loading={isSubmitting} positive 
                    content='Register' type='Submit' fluid  />
                </Form>
            )}
        </Formik>
    );
})