import Navabar from './navbar';
import MovieCard from './moviecard';
import Carousel, {CarouselItem} from './carousel';
import lalaland from '../images/lalaland.jpg'
import '../assets/home.css';

export default function Home(){
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


                {/* API call to get appropriate movies based on classes */}

                <div className='trending'>
                    <h1>Trending Now</h1>
                    {/* API call and pass values as props to MovieCard component */}
                    <div className='moviecard-container'>
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                    </div>
                </div>


                {/* top movies */}
                <div className='trending'> 
                    <h1>Trending Now</h1>
                    <div className='moviecard-container'>
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
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