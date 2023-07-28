import React from 'react';
import { NavLink} from 'react-router-dom';
import '../styles/styles.css'

const Header = () => {
  return (
    <div className="header-container">

      <NavLink
        to={'/'}
        className='header-link'>
        <div className="header-title">Word Keeper</div>
      </NavLink>

      <NavLink
        to={'starred'}
        className='header-link'>
        <div className="header-title">
          <span className="star">&#9733;</span>
          Starred Words
        </div>
      </NavLink>

    </div>
  );
};

export default Header;