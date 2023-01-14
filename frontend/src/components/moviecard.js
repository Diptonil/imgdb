import React from 'react';
import { Link } from 'react-router-dom';
import lalaland from '../images/lalaland.jpg'

const IMG_URL = "https://image.tmdb.org/t/p/w500"

export default function MovieCard({id, poster_path}){
    // passed down from the API end point

    return(
        <div className='moviecard'>
            <br></br>
            <br></br>
            <Link to ={"/moviedesc/"+ id}>
                {/* update alt tag name according to props */}
                <img className='movieposter' alt='lalaland' src={poster_path != undefined? IMG_URL+poster_path: lalaland}></img>
            </Link>
            <h1 className='movie-name'>La La Land</h1>
            <h2 className='rating'>4.8</h2>
            <h2 className='year'>2017</h2>
        </div>
    )
}