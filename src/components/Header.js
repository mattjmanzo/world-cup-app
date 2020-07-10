import React from 'react';
import logo from '../img/logo.png';

function Header(props) {
    return (
        <header className='center'>
           <img src={logo} alt='' /> 
        </header>
    );
}

export default Header;