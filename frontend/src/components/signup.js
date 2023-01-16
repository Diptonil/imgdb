import {useState} from 'react';
import lalaland from '../images/lalaland.jpg'
import { Link } from 'react-router-dom';
import axios from '../api/axios'

import '../assets/login.css'

const SUBMIT_URL = "/register"

export default function Signup(){
    
    const [errMsg, setErrMSg] = useState("")

    const [signupdata, setSignupdata] = useState({
        username: "",
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

    const handleSubmit= async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(SUBMIT_URL, JSON.stringify({
                username: signupdata.username, 
                password: signupdata.password
            }), {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            }
            
            )
        } catch (err){
            if (!err?.response){
                setErrMSg('No Server Response')
            } else if(err.response?.status === 409){
                setErrMSg('Username already taken')
                console.log(errMsg)
            } else{
                setErrMSg('Registration Failed')
                console.log(errMsg)
            }
        }
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

                    {/* <input type="email"
                    placeholder = "Email ID"
                    onChange = {handleChange}
                    name = "email"
                    value= {signupdata.email}
                    required/> */}

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