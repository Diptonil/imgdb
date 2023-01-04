import React from 'react';
import {useState} from 'react';
import lalaland from '../images/lalaland.jpg'
import { Link } from 'react-router-dom';

import '../assets/login.css'

export default function Signup(){
    const [signupdata, setSignupdata] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    function handleChange(event){
        console.log(event.target.value)
        setSignupdata(prevFormData => {
            return{
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleSubmit(){
        return
    }

    return(
        <div className='signup-login'>
            <img className='movieposter' alt='lalaland' src={lalaland}></img>
            <div className='form-container'>
                <div className='welcome-text'>
                    <h1>Welcome to IMGDb!</h1>
                    <p>We are excited to have to here! Let's set up your account and get you started.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                    placeholder = "Username"
                    onChange = {handleChange}
                    name = "username"
                    value= {signupdata.username}
                    required/>

                    <input type="email"
                    placeholder = "Email ID"
                    onChange = {handleChange}
                    name = "email"
                    value= {signupdata.email}
                    required/>

                    <input type="password"
                    placeholder = "Password"
                    onChange = {handleChange}
                    name = "password"
                    value= {signupdata.password}
                    required/>

                    <input type="password"
                    placeholder = "Confirm Password"
                    onChange = {handleChange}
                    name = "confirmpassword"
                    value= {signupdata.confirmpassword}
                    required/>

                    <p>Already have an account? <Link to ="/login">Log in.</Link></p>

                    <button className='submit-btn'>Submit</button>
                </form>
            </div>
        </div>
    )
}