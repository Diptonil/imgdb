import React from 'react';
import { Link } from 'react-router-dom';
import lalaland from '../images/lalaland.jpg'

const IMG_URL = "https://image.tmdb.org/t/p/w500"

export default function MovieCard({id, poster_path, title, rating, year_of_realease, description, genre, income, language, length, votes}){

    return(
        <div className='moviecard'>
            <br></br>
            <br></br>
            <Link to =  {"/movie"}  
            state = {{
                id,
                poster_path,
                title,
                rating,
                year_of_realease,
                description, genre, income, language, length, votes
            }}
            >
                <img className='movieposter' alt='lalaland' src={poster_path !== undefined? IMG_URL+poster_path: lalaland}></img>
            </Link>
            <h1 className='movie-name'>{title}</h1>
            <h2 className='rating'>
                {rating < 0 
                ? "Not rated"
                : rating}
                </h2>
            <h2 className='year'>{year_of_realease}</h2>
        </div>
    )
}