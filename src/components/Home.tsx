import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Home = () => {
  const [word, setWord] = useState('');

  const options = {
    method: 'GET',
    url: `https://www.dictionaryapi.com/api/v3/references/sd3/json/${word}?key=eebee736-a6e0-4d40-8c30-478c185f0b11`,
  };

  const getWord = async () => {

    try {
      const response = await axios.request(options);
      console.log(response.data);
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (word) {

      const timeoutId = setTimeout(getWord, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
    ;
  }, [word]);

  return (
    <div className="container">
      <div className="input-container">
        <input type="text"
               className="search-input"
               placeholder="Поиск"
               onChange={e => setWord(e.currentTarget.value)}/>
      </div>

      <div className="items-container">

      </div>

    </div>
  );
};

export default Home;