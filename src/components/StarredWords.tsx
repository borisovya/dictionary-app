import React from 'react';

const StarredWords = () => {


  return (
    <div>
      <h1>Starred words</h1>

      <div className="container">
        <div className='input-container'>
          <input type="text" className="search-input" placeholder="Поиск"/>
        </div>

        <div className='items-container'>

        </div>

      </div>
    </div>
  );
};

export default StarredWords;