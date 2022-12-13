import Navabar from './navbar';
import MovieCard from './moviecard';

export default function Home(){
    return(
        <div>
            <Navabar />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className='container'>

                {/* Recs Placeholder */}

                <div>
                    <h1>Trending Now</h1>
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    
                </div>

                {/* <div className='genre'>
                    <h1>Explore Genres</h1>
                    <div>
                        Horror
                    </div>
                    <div>
                        Thriller
                    </div>
                </div> */}
            </div>
        </div>
    )
}