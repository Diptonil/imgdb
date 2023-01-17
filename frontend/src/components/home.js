import Navabar from './navbar';
import MovieCard from './moviecard';
import Carousel, {CarouselItem} from './carousel';
import Recommendations from './recommendations';
import lalaland from '../images/lalaland.jpg'
import '../assets/home.css';
import React, { useEffect } from 'react';
import { TMDB_API_KEY } from '../api/key';

const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`

export default function Home(){

    const [movies, setMovies] = React.useState([]);

    useEffect(() => {
        fetch(API_URL)
        .then((res) => res.json())
        .then(data => {
            console.log(data);
            setMovies(data.results)
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

                <div className='trending'>
                    <h1>Trending Now</h1>
                    {/* API call and pass values as props to MovieCard component */}
                    <div className='moviecard-container'>
                        <MovieCard name='la la land' />
                        <MovieCard name='before sunrise'/>
                        <MovieCard name='before midnight'/>
                    </div>
                </div>


                {/* top movies */}
                <div className='trending'> 
                    <h1>Trending Now</h1>
                    <div className='moviecard-container'>
                        {movies.map((movieRequest) => <MovieCard key={movieRequest.id} {...movieRequest}/>)}
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