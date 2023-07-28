import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'

const Header = () => {
  return (
    <div className="header-container">

      <Link to={'/'} className='header-link'>
        <div className="header-title">Word Keeper</div>
      </Link>

      <Link to={'starred'} className='header-link'>
        <div className="header-title">
          <span className="star">&#9733;</span>
          Starred Words
        </div>
      </Link>

    </div>
  );
};

export default Header;