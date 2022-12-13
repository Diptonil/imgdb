import React from 'react';

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
        <form onSubmit={handleSubmit}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
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

        <button>Submit</button>
        </form>
    )
}