import React, {useState} from 'react';

export default function Recommendations(){
    const [formdata, setFormdata] = React.useState("")
    
    function handleChange(e){
        setFormdata(e.target.value)
    }

    const handleSubmit= async(e) => {
        e.preventDefault(); 
    }

    return(
        <div className='recs'>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Find movies similar to your favourite movies.</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder = "Start Typing..."
                    onChange={handleChange}
                    name = "formdata"
                    value= {formdata}
                    className= "rec-text"
                />
            <button id='rec-button' className='submit-btn'>Search</button>
            </form>
        </div>
    )
}