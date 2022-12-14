import React from 'react';
import MovieCard from './moviecard';
import lalaland from '../images/lalaland.jpg'
import '../assets/movie.css'

export default function MovieDesc(props){

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
            <img aria-hidden className='background-poster' src={lalaland}></img>
            <div className='outer-grid'>
                <img alt='movie poster' className='movie-poster' src={lalaland}></img>
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
                        <div>Ryan Gosling ???</div>
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