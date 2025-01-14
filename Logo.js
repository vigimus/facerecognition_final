import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return(
		<div>
		<div style={{ height: '150px', width: '150px', backgroundColor: 'White' }}>
		<Tilt className='br2 shadow-2'>
        <h1><img alt='logo' src={brain}/></h1>
        </Tilt>
        </div>
        </div>
  );
}

export default Logo;