import React, { useEffect, useState } from 'react';
import { Link, useLocation} from "react-router-dom";
import MovieCard from './moviecard';
import lalaland from '../images/lalaland.jpg'
import useAuth from "../hooks/useAuth";

import '../assets/movie.css'

const IMG_URL = "https://image.tmdb.org/t/p/w500"
const API_URL = `http://localhost:5000`

export default function MovieDesc(){
    let location = useLocation();
    let prop = location.state
    console.log(location.state)
    const { auth } = useAuth();
    const [collapsed, setCollapsed] = React.useState(false)


    function collapse(){
        setCollapsed(prevCollapsed => !prevCollapsed)
    }

    const [activeItem, setActiveItem] = React.useState(1)
    const toggleTab = (index) => {
        setActiveItem(index);
    }

    const [watchlisted, setWatchlisted] = useState(false)
    function handleClick(){
        setWatchlisted(preValue => !preValue)
    }

    return(
        <div>
            <img className='background-poster' alt='movie poster' aria-hidden src={prop.poster_path !== undefined? IMG_URL + prop.poster_path: lalaland}></img>
            <div className='outer-grid'>
                <img className='movie-poster' alt='movie poster' src={prop.poster_path !== undefined? IMG_URL+ prop.poster_path: lalaland}></img>
                <div className='movie-info-container'>
                    <div className='movie-info'>
                        <h1>{prop.title}</h1>
                        <h4 className='duration'>{prop.length} min</h4>
                        <h4 className='genre'>{prop.genre}</h4>
                        <h4 className='year'>{prop.year_of_realease}</h4>
                        
                        <br></br>
                        <p className='description'>{prop.description}</p>

                        {
                            auth?.username
                            ?
                            <button 
                            onClick={handleClick} 
                            className='primary-button'>{watchlisted? "Added to Watchlist": "Add to Watchlist"}</button>
                            :
                            <Link to ="/login" className='primary-button'>Add to Watchlist</Link>
                        }
                        

                        {/* <button className='secondary-btn'>Mark as watched</button> */}
                    </div>
                </div>

                <div className='more-info'>
                    <h1 className='movie-rating'>{prop.rating < 0 
                ? "Not rated"
                : prop.rating}</h1>
                    <h5 className='vote-count'>{prop.votes} votes</h5>
                    <h5 className='review-count'></h5>

                    <h5 className='language'>Language</h5>
                    <h3>{prop.language}</h3>
                    
                    <h5 className='language'>Income</h5>
                    <h3>{prop.income}</h3>

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