import React from 'react';
import {useState, useContext} from 'react';
import { Link } from 'react-router-dom';

import axios from '../api/axios'
import AuthContext from '../context/AuthProvider';
import '../assets/login.css'

const SUBMIT_URL = "/login"

export default function Login(){
    const { setAuth } = useContext(AuthContext)
    const [errMsg, setErrMSg] = useState("")

    const [formdata, setFormdata] = React.useState({
        username: "",
        password: "",
    })

    function handleChange(event){
        setFormdata(prevFormData => {
            return{
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSubmit= async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(SUBMIT_URL, JSON.stringify({
                username: formdata.username, 
                password: formdata.password
            }), 
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            }
            );

            const accessToken = response?.token
            setAuth({ username: formdata.username, 
                password: formdata.password, accessToken})

        } catch (err){
            if (!err?.response || err.response?.status === 500){
                setErrMSg('Login unsuccessful. There is some problem with the server. Please try again later.')
                console.log(errMsg)
            } else if(err.response?.status === 401){
                setErrMSg('Login unsuccessful. Please recheck your credentials.')
                console.log(errMsg)
            } else {
                setErrMSg('Login unsuccessful.')
                console.log(errMsg)
            }
        }
    }

    return(

        <div className='signup-login'>
            <div className='form-container'>
            <div className='welcome-text'>
                    <h1>Welcome Back!</h1>
                    <p>Login and dive right back into your exploration journey.</p>
                </div>
                <form onSubmit={handleSubmit}>
                        <input type="text"
                        placeholder = "Username"
                        onChange = {handleChange}
                        name = "username"
                        value= {formdata.username}
                        />

                        <input type="password"
                        placeholder = "Password"
                        onChange = {handleChange}
                        name = "password"
                        value= {formdata.password}
                        />

                <p>Do not have an account yet? <Link to ="/signup">Sign up!</Link></p>

                    <button className='submit-btn'>Submit</button>
                </form>
            </div>
            
        </div>
    )
}