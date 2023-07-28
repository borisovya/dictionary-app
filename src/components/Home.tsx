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
      <div className="container w-full mt-10 h-1/6 flex justify-between ">
        <div className="bg-neutral-400 h-200 w-1/3 flex">
          <div className="flex relative w-full mt-5 justify-center">
            <input type="text"
                   className="flex justify-center h-10 rounded w-3/4 p-2 pr-10"
                   placeholder="Поиск"
                   onChange={e => setWord(e.currentTarget.value)}/>
          </div>
        </div>

        <div className=" w-3/4 ml-15 flex-grow flex flex-col h-max">
          <div className="flex bg-blue-50 h-10 justify-between items-center ml-5 pl-5">
            Поиск не дал результатов
          </div>

        </div>
      </div>
    );
  }

    return (
      <div className="container w-full mt-10 h-1/6 flex justify-between ">

        <div className="bg-neutral-400 h-200 w-1/3 flex justify-center">
            <input type="text"
                   className="flex justify-center h-10 mt-5 rounded w-3/4 p-2 pr-10"
                   placeholder="Поиск"
                   onChange={e => setWord(e.currentTarget.value)}/>

        </div>

        <div className=" relative w-2/4 ml-15 flex-grow flex flex-col h-max">
          {items && items.length > 0 && items.map((i, index) => {
            return <div className="flex bg-blue-50 h-10 mb-5 justify-between items-center ml-5 " key={index}>
              <div className="flex font-bold w-2/6 ml-2">{i.hwi?.hw ?? '-'}</div>
              <div className="flex italic w-2/6 mr-4">{i.fl ?? '-'}</div>
              <div className="flex w-3/4 truncate  mr-8">{i.shortdef ? i.shortdef[0] : '-'}</div>
              <div className="flex w-1/10">
                {!ids.includes(i.meta.id)
                  ? <div className="flex ml-2 mr-4 cursor-pointer text-gray-400"
                         onClick={() => onclickHandler(i)}>&#9733;</div>
                  : <div className="flex ml-2 mr-4 cursor-pointer text-blue-400"
                         onClick={() => onclickHandlerRemove(i)}>&#9733;</div>
                }
              </div>
            </div>;
          })
          }
        </div>

      </div>
    );
  }
  ;

  export default Home;