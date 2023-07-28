import React from 'react';
import { NavLink} from 'react-router-dom';
import '../styles/styles.css'

const Header = () => {
  return (
    <div className="container w-full h-20 bg-blue-400 flex items-center justify-between p-10 mt-5 rounded-xl">

      <NavLink
        to={'/'}
        className='text-xl text-white'>
        <div className="font-bold">Word Keeper</div>
      </NavLink>

      <NavLink
        to={'starred'}
        className='text-xl text-white'>
        <div className="flex">
          <span className='text-white mr-1'>&#9733;</span>
          <div className="font-bold">Starred Words</div>

        </div>
      </NavLink>

    </div>
  );
};

export default Header;