import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'src/store/store';
import {wordsService} from '../services/wordsService';
import {addToFavorites, removeFromFavorites} from '../store/reducer/favoritesSlice';

const Home = () => {
    const [word, setWord] = useState<string>('');
    const [expandedItemId, setExpandedItemId] = useState<string>('');
    const [items, setItems] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const ids = useAppSelector(state => state.favorites.ids);
    const dispatch = useAppDispatch();

    const onclickHandler = (str: string) => {
      dispatch(addToFavorites(str));
    };

    const onclickHandlerRemove = (str: string) => {
      dispatch(removeFromFavorites(str));
    };

    const onItemClickHandler = (itemId: string) => {
      if (expandedItemId === itemId) {
        setExpandedItemId('');
      }
      else {
        setExpandedItemId(itemId);
      }
    };

    useEffect(() => {
      if (word) {
        setLoading(true);
        const fetchWords = async () => {
          try {
            const response = await wordsService.getWords(word);
            setItems(response);
          }
          catch (error) {
            console.error(error);
          }
          finally {
            setLoading(false);
          }
        };

        const timeoutId = setTimeout(fetchWords, 1000);

        return () => {
          clearTimeout(timeoutId);
        };
      }

      setItems([]);
    }, [word]);
  console.log(items);
    return (
      <div className="container w-full mt-10 h-1/6 flex justify-between ">

        <div className="bg-neutral-400 h-200 w-1/3 flex justify-center">
          <input type="text"
                 value={word}
                 className="flex justify-center h-10 mt-5 rounded w-3/4 p-2 pr-10"
                 placeholder="Поиск"
                 onChange={e => {
                   setWord(e.currentTarget.value);
                 }}/>

        </div>

        <div className=" relative w-2/4 ml-15 flex-grow flex flex-col h-max">
          {items && items.length > 0 && items[0].meta
            ? items.map((i, index) => {

              return <div className="flex flex-col">
                <div className="flex bg-blue-50 h-10 mb-5 justify-between items-center ml-5 cursor-pointer" key={index}
                     onClick={() => onItemClickHandler(i.meta.id)}>
                  <div className="flex font-bold w-2/6 ml-2">{i.hwi?.hw ?? '-'}</div>
                  <div className="flex italic w-2/6 mr-4">{i.fl ?? '-'}</div>
                  <div className="flex w-3/4 truncate  mr-8">{i.shortdef ? i.shortdef[0] : '-'}</div>
                  <div className="flex w-1/10">
                    {!ids.includes(i.meta.id)
                      ? <div className="flex ml-2 mr-4 cursor-pointer text-gray-400"
                             onClick={() => onclickHandler(i)}>&#9733;</div>
                      : <div className="flex ml-2 mr-4 cursor-pointer text-blue-400"
                             onClick={() => onclickHandlerRemove(i)}>&#9733;</div>
                      ?? null}
                  </div>
                </div>

                {expandedItemId === i.meta.id && (
                  <div className="flex flex-col bg-blue-100 p-2 justify-between items-start ml-5 mb-5 mt-[-20px]">
                    <div>Definitions:</div>
                    {i.shortdef.map((definition: string) => {
                      return  <div className='mt-2'>- {definition}</div>
                    })}
                  </div>
                )}

              </div>;
            })
            : (word && !loading ?
              <div className="flex bg-blue-50 h-10 mb-5 justify-between items-center ml-5 pl-5"> Поиск не дал
                результатов </div> : null)
          }

        </div>

      </div>
    );
  }
;

export default Home;