import React, { useEffect, useState } from 'react';
import MovieCard from './moviecard';
import { useParams } from "react-router-dom";
import lalaland from '../images/lalaland.jpg'
import '../assets/movie.css'
import { TMDB_API_KEY } from '../api/key';

const IMG_URL = "https://image.tmdb.org/t/p/w500"

export default function MovieDesc(){
    const { id } = useParams();
    // Use the id to fetch the other data by making a call to the API
    const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`

    const [imgInfo, setImgInfo] = useState({})

    useEffect(() => {
        fetch(API_URL)
        .then((res) => res.json())
        .then(data => {
            console.log(data);
            setImgInfo(data)
        })
    }, [])

    const [collapsed, setCollapsed] = React.useState(false)


    function collapse(){
        setCollapsed(prevCollapsed => !prevCollapsed)
    }

    const [activeItem, setActiveItem] = React.useState(1)
    const toggleTab = (index) => {
        setActiveItem(index);
    }

    return(
        <div>
            <img className='background-poster' alt='movie poster' aria-hidden src={imgInfo.poster_path != undefined? IMG_URL+ imgInfo.poster_path: lalaland}></img>
            <div className='outer-grid'>
                <img className='movie-poster' alt='movie poster' src={imgInfo.poster_path != undefined? IMG_URL+ imgInfo.poster_path: lalaland}></img>
                <div className='movie-info-container'>
                    <div className='movie-info'>
                        <h1>La La Land</h1>
                        <h4 className='duration'>02h 23m</h4>
                        <h4 className='genre'>Romance, Comedy</h4>
                        <h4 className='year'>2017</h4>
                        
                        <br></br>
                        <p className='description'>loream epsum and a bunch of other stuff coause whateverrrrrrr loream epsum and a bunch of other stuff coause whateverrrrrrr loream epsum and a bunch of other stuff coause whateverrrrrrr loream epsum and a bunch of other stuff coause whateverrrrrrr</p>

                        <button className='primary-button'>Add to Watchlist</button>
                        <button className='secondary-btn'>Mark as watched</button>
                    </div>
                </div>

                <div className='more-info'>
                    <h1 className='movie-rating'>4.5</h1>
                    <h5 className='vote-count'>23454 votes</h5>
                    <h5 className='review-count'></h5>

                    <h5 className='language'>Launguage</h5>
                    <h3>English</h3>
                    
                    <h5 className='language'>pg thingy</h5>
                    <h3>idk</h3>

                    <h5 className='director'>Director</h5>
                    <h3>Damien</h3>

                    <h5 >Cast</h5>
                    <div className='cast'>
                        <div>Ryan Gosling ♡</div>
                        <div>Emma Stone</div>
                    </div>
                </div>
            </div>

            <div class="collapsible-container">
                <button onClick={collapse} type="button" class="collapsible">comments</button>
                <div class="collapsible-content">
                    {collapsed && 
                    <div>
                        <div>
                            <img></img>
                            <h3>Namee name</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>

                        <br></br>

                        <div>
                            <img></img>
                            <h3>Namee name</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                    
                    

                    }
                </div>
            </div>

            {/* gotta changee */}
            <div className='recommended-movies' id='1'> 
                <div className='side-nav'>
                    <div className={activeItem === 1? "tablink tab-active" : "tablink"} onClick={() => toggleTab(1)} >Recommended</div>
                    <div className={activeItem === 2? "tablink tab-active" : "tablink"} onClick={() => toggleTab(2)}>Same Director</div>
                    <div className={activeItem === 3? "tablink tab-active" : "tablink"} onClick={() => toggleTab(3)} >Same Cast</div>
                </div>
                
                {
                    activeItem === 1 && 
                    <div className='moviecard-container'>
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                    </div>
                }
                
                {
                    activeItem === 2 && 
                    <div className='moviecard-container'>
                        <MovieCard />
                        <MovieCard />
                    </div>
                }

                {
                    activeItem === 3 && 
                    <div className='moviecard-container'>
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                    </div>
                }
            </div>
            
            {/* footer */}

            <br></br>
            <br></br>
        </div>

  // "proxy":"http://localhost:5000/",

    
    )
}