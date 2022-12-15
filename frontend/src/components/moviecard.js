import React from 'react';
import lalaland from '../images/lalaland.jpg'

export default function MovieCard(props){
    return(
        <div className='moviecard'>
            <br></br>
            <br></br>
            <img className='movieposter' src={lalaland}></img>
            <h1 className='movie-name'>La La Land</h1>
            <h2 className='rating'>4.8</h2>
            <h2 className='year'>2017</h2>
            <div className='genre'>
                Musical, Romance
            </div>
        </div>
    )
}