import React from 'react';
import image from '../img/world-cupbackground.jpg';

const Banner = (props) => {
    return <header className="banner"
                style={{
                    backgroundSize:'cover',
                    backgroundImage: `url(${image})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
            <div className='banner__content'>
            <h1>stuff</h1>
                {/* <div className='card-inner'>
                    <div className='card-front'>
                     <img src={props.item.Flag} alt='' />
                    </div>
                </div> */}
            </div>
            <div className="banner--fadeBottom"/>
         </header>          
}
 
export default Banner;

    