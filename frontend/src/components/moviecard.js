import React from 'react';
import { Link } from 'react-router-dom';
import lalaland from '../images/lalaland.jpg'

export default function MovieCard(props){
    return(
        <div className='moviecard'>
            <br></br>
            <br></br>
            <Link to ="/moviedesc">
                {/* update alt tag name according to props */}
                <img className='movieposter' alt='lalaland' src={lalaland}></img>
            </Link>
            <h1 className='movie-name'>La La Land</h1>
            <h2 className='rating'>4.8</h2>
            <h2 className='year'>2017</h2>
            {/* <div className='genre'>
                Musical, Romance
            </div> */}
        </div>
    )
}