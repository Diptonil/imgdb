import React from 'react';

export default function Login(){

    const [formdata, setFormdata] = React.useState({
        email: "",
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

    return(
        <form>
            <input type="text"
            placeholder = "Email ID"
            onChange = {handleChange}
            name = "email"
            />

            <input type="text"
            placeholder = "Password"
            onChange = {handleChange}
            name = "password"
            />
        </form>
    )
}