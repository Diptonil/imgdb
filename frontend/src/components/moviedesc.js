import React, { useState , useEffect} from 'react';
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

    const [actors, setActors] = useState({})
    const [ director, setDirector ] = useState([])
    
    const [explore, setExplore] = useState([])

    useEffect(() => {
        fetch(API_URL+ '/recommendation', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                            movie: prop.title
                        })
        })
        .then((res) => res.json())
        .then(data => {
            setExplore(data.data)
        })
    }, [])
    

    useEffect(() => {
        fetch(API_URL+ '/actor/get',  {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                            id: prop.id
                        })
        })
        .then((res) => res.json())
        .then(data => {
            setActors(data.data)
            
        })
    }, [])


    useEffect(() => {
        fetch(API_URL+ '/director/get',  {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                            id: prop.id
                        })
        })
        .then((res) => res.json())
        .then(data => {
            setDirector(data.data)
            console.log(data.data)
        })
    }, [])

    const [actorMovies, setActorMovies] = useState([]);
    const [directorMovies, setDirectorMovies] = useState([]);
    function getActorMovies(){
        fetch(API_URL+ '/movies/get',  {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                            person_id: actors.person_id1
            })
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data.data)
            setActorMovies(data.data)
        })
        toggleTab(3)
    }

    function getDirectorMovies(){
        fetch(API_URL+ '/movies/get',  {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                            person_id: director[1]
            })
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data.data)
            setDirectorMovies(data.data)
        })
        toggleTab(2)
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
                    <h3>{director[0]}</h3>

                    <h5 >Cast</h5>
                    <div className='cast'>
                        <div>{actors.name1}</div>
                        <div>{actors.name2}</div>
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
                    <div className={activeItem === 2? "tablink tab-active" : "tablink"} onClick={getDirectorMovies }>Same Director</div>
                    <div className={activeItem === 3? "tablink tab-active" : "tablink"} onClick={getActorMovies} >Same Cast</div>
                </div>
                
                {
                    activeItem === 1 && 
                    <div>
                        <br></br>
                        <br></br>
                        <div className='moviecard-container'>
                            {explore.map((movieRequest) => <MovieCard key={movieRequest.id} {...movieRequest}/>)}
                        </div>
                    </div>
                }
                
                {
                    activeItem === 2 && 
                    <div>
                        <br></br>
                        <br></br>
                        <div className='moviecard-container'>
                            {directorMovies.map((movieRequest) => <MovieCard key={movieRequest.id} {...movieRequest}/>)}
                        </div>
                    </div>
                }

                {
                    activeItem === 3 && 
                    <div>
                        <br></br>
                        <br></br>
                        <div className='moviecard-container'>
                            {actorMovies.map((movieRequest) => <MovieCard key={movieRequest.id} {...movieRequest}/>)}
                        </div>
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