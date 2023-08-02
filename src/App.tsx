import React from 'react';
import {Outlet,} from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
      <div className='flex flex-col h-screen bg-gray-300 items-center'>
        <Header/>
        <Outlet />
      </div>
  );
}

export default App;
