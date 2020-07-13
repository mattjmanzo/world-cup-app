import React from 'react';

const Country = (props) => {
    return <div className='card'>
                <div className='card-inner'>
                    <div className='card-front'>
                     <img src={props.item.Flag} alt='' />
                    </div>
                </div>
            </div>;
}
 
export default Country;

    