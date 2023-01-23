import Navabar from './navbar';
import MovieCard from './moviecard';
import Carousel, {CarouselItem} from './carousel';
import Recommendations from './recommendations';
import lalaland from '../images/lalaland.jpg'
import '../assets/home.css';
import React, { useState, useEffect } from 'react';

// const tmdb_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`
const API_URL = `http://localhost:5000`

export default function Home(){

    const [explore, setExplore] = useState([]);
    const [trending, setTrending] = React.useState([]);

    // useEffect(() => {
    //     fetch(tmdb_URL)
    //     .then((res) => res.json())
    //     .then(data => {
    //         setTrending(data.results)
    //     })
    // }, [])

    useEffect(() => {
        fetch(API_URL+ '/explore')
        .then((res) => res.json())
        .then(data => {
            setExplore(data.data)
        })
    }, [])

    return(
        <div>
            <Navabar />
                <Carousel>
                    <CarouselItem><img alt='movie poster' src={lalaland}></img></CarouselItem>
                    <CarouselItem><img alt='movie poster' src={lalaland}></img></CarouselItem>
                    <CarouselItem><img alt='movie poster' src={lalaland}></img></CarouselItem>
                    <CarouselItem><img alt='movie poster' src={lalaland}></img></CarouselItem>
                    <CarouselItem><img alt='movie poster' src={lalaland}></img></CarouselItem>
                </Carousel>

            <div className='container'>

                {/* Reccomendatios Placeholder */}
                <Recommendations/>

                {/* API call to get appropriate movies based on classes */}

                {/* top movies */}
                <div className='trending'> 
                    <h1>Trending Now</h1>
                    <div className='moviecard-container'>
                        {trending.map((movieRequest) => <MovieCard key={movieRequest.id} {...movieRequest}/>)}
                    </div>
                </div>

                <div className='explore'>
                    <h1>Explore</h1>
                    <div className='moviecard-container'>
                        {explore.map((movieRequest) => <MovieCard key={movieRequest.id} {...movieRequest}/>)}
                    </div>
                </div>

                <div className='top-shows'>

                </div>

                
                {/* API call to get appropriate movies based on classes 
                * Display of a list of movies of a particular genre on click
                */}
                <div className='top-genres'>

                </div>


            </div>
        </div>
    )
}