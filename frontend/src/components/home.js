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
                    <CarouselItem><img src={lalaland}></img></CarouselItem>
                    <CarouselItem><img src={lalaland}></img></CarouselItem>
                    <CarouselItem><img src={lalaland}></img></CarouselItem>
                    <CarouselItem><img src={lalaland}></img></CarouselItem>
                    <CarouselItem><img src={lalaland}></img></CarouselItem>
                </Carousel>

            <div className='container'>

                {/* Recs Placeholder */}

                <div className='trending'>
                    <h1>Trending Now</h1>
                    <div className='moviecard-container'>
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                    </div>
                </div>

                <div className='trending'>
                    <h1>Trending Now</h1>
                    <div className='moviecard-container'>
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                    </div>
                </div>
                
            </div>
        </div>
    )
}