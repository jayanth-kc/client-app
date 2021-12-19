import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import {  useNavigate } from "react-router-dom";

export default observer(function LoginForm(){
    const navigate = useNavigate();
    const {userStore} = useStore();
    return(
        <Formik 
        initialValues={{email:'',password:'',error:null}}
        onSubmit={(values, {setErrors})=> userStore.login(values,navigate).catch(error=>setErrors({error:"Inavalid Email or Password"}))}
        >
            {({handleSubmit, isSubmitting,errors})=>(
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content="Login to Reactivites" color="teal" textAlign="center" />
                    <MyTextInput placeholder='Email' name='email' />
                    <MyTextInput placeholder='Password' name='password' type="Password" />
                    <ErrorMessage name='error' render={()=>
                    <Label style={{marginBottom:10}} basic color="red" content={errors.error}/>
                    
                    } />

                    
                    <Button loading={isSubmitting} positive content='Login' type='Submit' fluid  />
                </Form>
            )}
        </Formik>
    );
})