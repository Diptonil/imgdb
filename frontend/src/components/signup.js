import React from 'react';
import {useState, useRef, useEffect} from 'react';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6, 24}$/;

export default function Signup(){

    const userRef = useRef();
    const errRef = useRef();

    const [signupdata, setSignupdata] = React.useState({
        email: "",
        password: "",
        confirmpassword: ""
    })

    const [validData, setValidData] = useState({
        email: false,
        password: false,
        confirmpassword: false
    })

    const [dataFocus, setDataFocus] = useState({
        email: false,
        password: false,
        confirmpassword: false
    })

    const [errmsg, setErrmsg] = useState('')
    const [success, setSuccess] = useState(false)


    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(signupdata.email);
        setValidData(prevFormData => {
            return{
                ...prevFormData,
                email: result
            }
        })
    }, [signupdata.email])

    useEffect(() => {
        const result = PWD_REGEX.test(signupdata.password);
        setValidData(prevData => {
            return{
                ...prevData,
                password: result
            }
        })
        console.log(result)
        const match = signupdata.password === signupdata.confirmpassword
        setValidData(prevData => {
            return{
                ...prevData,
                confirmpassword: match
            }
        })
    }, [signupdata.confirmpassword, signupdata.password])


    useEffect(() => {
        setErrmsg('');
    }, [signupdata.email, signupdata.password, signupdata.confirmpassword])


    
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
        <form onSubmit={handleSubmit}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <p >

            </p>

            <input type="text"
            placeholder = "Email ID"
            onChange = {handleChange}
            name = "email"
            value= {signupdata.email}
            // onFocus = {() => setDataFocus(prevData => {
            //     return{
            //         ...prevData,
            //         email: true
            //     }
            // })}
            // onBlur = {() => setDataFocus(prevData => {
            //     return{
            //         ...prevData,
            //         email: false
            //     }
            // })}            ref = {userRef}

            />

            <input type="password"
            placeholder = "Password"
            onChange = {handleChange}
            name = "password"
            value= {signupdata.password}
            />

            <input type="password"
            placeholder = "Confirm Password"
            onChange = {handleChange}
            name = "confirmpassword"
            value= {signupdata.confirmpassword}
            />

            <button>Submit</button>
        </form>
    )
}