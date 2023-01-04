import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/login.css'

export default function Login(){

    const [formdata, setFormdata] = React.useState({
        email: "",
        password: "",
    })

    function handleChange(event){
        console.log(event.target.value)
        setFormdata(prevFormData => {
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
            <div className='form-container'>
            <div className='welcome-text'>
                    <h1>Welcome Back!</h1>
                    <p>Login and dive right back into your exploration journey.</p>
                </div>
                <form onSubmit={handleSubmit}>
                        <input type="text"
                        placeholder = "Email ID"
                        onChange = {handleChange}
                        name = "email"
                        value= {formdata.email}
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