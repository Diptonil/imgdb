import React, {useState} from 'react';
import axios from '../api/axios'
import MovieCard from './moviecard';
import { Link } from 'react-router-dom';

export default function Recommendations(){
    const [formdata, setFormdata] = React.useState("")
    const [success, setSuccess] = React.useState(false)
    const [explore, setexplore] = React.useState([])
    function handleChange(e){
        setFormdata(e.target.value)
    }

    const handleSubmit= async(e) => {
        e.preventDefault(); 
        setSuccess(true);
        try {
            const response = await axios.post('/recommendation', JSON.stringify({
                movie: formdata
            }), 
            {
                headers: { 'Content-Type': 'application/json'}
            }
            );
            
            setexplore(response.data.data)
            console.log(response.data.data)
            setSuccess(true)
        } catch (err){
                console.log("errMsg")
        }
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
            
                <button  id='rec-button' className='submit-btn'> Search</button>
                
            
            </form>
                
            {
                success?
                <div className='explore'>
                    <h1>Recommendations</h1>
                    <div className='moviecard-container'>
                        {explore.map((movieRequest) => <MovieCard key={movieRequest.id} {...movieRequest}/>)}
                    </div>
                </div>
                : 
                <div></div>
            }
            
            
        </div>
    )
}