import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {addToFavorites, removeFromFavorites, searchFromFavorites} from '../store/reducer/favoritesSlice';

const StarredWords = () => {
  const [word, setWord] = useState<string>('');
  const favorites = useAppSelector(state => state.favorites.data);
  const filtered = useAppSelector(state => state.favorites.filteredData);
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
      dispatch(searchFromFavorites(word))
    }
  }, [word]);

  if(word && filtered) {
    return (
      <div className="container">
        <div className="input-container">
          <input type="text"
                 className="search-input"
                 placeholder="Поиск"
                 onChange={e => setWord(e.currentTarget.value)}/>
        </div>

        <div className="items-container">

          {filtered && filtered.length > 0 && filtered.map((i, index) => {

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

        {favorites && favorites.length > 0 && favorites.map((i, index) => {

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

export default StarredWords;