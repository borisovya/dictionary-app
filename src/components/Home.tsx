import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'src/store/store';
import {wordsService} from '../services/wordsService';
import {addToFavorites, removeFromFavorites} from '../store/reducer/favoritesSlice';

const Home = () => {
  const [word, setWord] = useState<string>('');
  const [items, setItems] = useState<any[] | null>(null);

  const ids = useAppSelector(state => state.favorites.ids);
  const dispatch = useAppDispatch();

  const onclickHandler = (str: string) => {
    dispatch(addToFavorites(str));
  };

  const onclickHandlerRemove = (str: string) => {
    dispatch(removeFromFavorites(str));
  };

  useEffect(() => {
    if (word) {
      const fetchWords = async () => {
        try {
          const response = await wordsService.getWords(word);
          setItems(response);
          console.log(response);
        }
        catch (error) {
          console.error(error);
        }
      };

      const timeoutId = setTimeout(fetchWords, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [word]);

  if (items && !items[0].hwi) {
    return (
      <div className="container">
        <div className="input-container">
          <input type="text"
                 className="search-input"
                 placeholder="Поиск"
                 onChange={e => setWord(e.currentTarget.value)}/>
        </div>

        <div className="items-container">
          <div className="wordItem">
            Поиск не дал результатов
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="input-container">
        <input type="text"
               className="search-input"
               placeholder="Поиск"
               onChange={e => setWord(e.currentTarget.value)}/>
      </div>

      <div className="items-container">

        {items && items.length > 0 && items.map((i, index) => {

          return <div className="wordItem" key={index}>
            <div className="wordInItem">{i.hwi?.hw ?? '-'}</div>
            <div className="wordInItemType">{i.fl ?? '-'}</div>
            <div className="wordMeaning">{i.shortdef ? i.shortdef[0] : '-'}</div>
            <div className="starContainer">
              {!ids.includes(i.meta.id)
                ? <div className="starOutline" onClick={() => onclickHandler(i)}>&#9733;</div>
                : <div className="starFilled" onClick={() => onclickHandlerRemove(i)}>&#9733;</div>
              }
            </div>
          </div>;
        })
        }

      </div>

    </div>
  );
};

export default Home;