import React, {useEffect, useState} from 'react';


export const CarouselItem = ({children, width}) => {
    return(
        <div className='carousel-item' style={{width: width}}>
                {children}
        </div>
    );
};

const Carousel = ({children}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex < 0){
            newIndex = React.Children.count(children) - 1;
        } else if (newIndex >= React.Children.count(children)){
            newIndex = 0; 
        }

        setActiveIndex(newIndex)
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updateIndex(activeIndex +1)
        }, 3500);

        return () => {
            if(interval){
                clearInterval(interval)
            }
        };
    });

    return(
            <div  className='carousel'>    
                <div className='inner' style={{ transform: `translateX(-${activeIndex * 100}%)`}}>
                    {React.Children.map(children, (child, index) => {
                        return React.cloneElement(child, {width: "100%"})
                    })}
                </div>  

                <div className='indicators'>
                    <div className='indicator-button-group'>
                        {/* <buttton onClick = {() => {
                            updateIndex(activeIndex - 1);
                        }}> Prev
                        </buttton> */}

                        {React.Children.map(children, (child, index) => {
                            return (
                                <button className={`${index === activeIndex? "active-carousel-index index-button" : "index-button"}`}
                                onClick = {() => {
                                    updateIndex(index);
                                }}>
                                    {`0${index+1}`}
                                </button>
                            )
                        }
                        )}


                        {/* <buttton onClick = {() => {
                            updateIndex(activeIndex + 1);
                        }}> Next
                        </buttton> */}
                    </div>

                </div>
                <div className='blurtop'>

                </div>
                <div className='blurbottom'>
                    
                </div>


                <div className='movie-details'>
                    <h1 className='movie-name'>
                        La La Land
                    </h1>
                    <div className='ratings'>
                        {/* icon */}
                        <p>4.8</p>
                    </div>
                    <h4 className='genre'>
                        Musical, Romance
                    </h4>

                    <br></br>
                    <br></br>
                    <button className='primary-button'>
                        Know More
                    </button>
                </div>
            </div>
            )
}

export default Carousel;