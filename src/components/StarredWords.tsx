import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {removeFromFavorites, setData, setFilters,} from '../store/reducer/favoritesSlice';
import Paginator from './Paginator';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {DictionaryEntry} from '../types/wordDetails';

const StarredWords = () => {
  const [word, setWord] = useState<string>('');
  const favorites = useAppSelector((state) => state.favorites.data);
  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const [isAbleToSetSessionStorage, setIsAbleToSetSessionStorage] = useState<boolean>(false);
  const [isAdjectiveChecked, setIsAdjectiveChecked] = useState(false);
  const [isNounChecked, setIsNounChecked] = useState(false);
  const [isVerbChecked, setIsVerbChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams();
  const [searchParams] = useSearchParams();
  const onclickHandlerRemove = (item: DictionaryEntry) => {
    onItemClickHandler();
    setItemToRemove(item);
    dispatch(removeFromFavorites(item));
  };

  const onItemClickHandler = () => {
    setIsAbleToSetSessionStorage(true);
  };

  const updateParamsInURL = () => {
    isAdjectiveChecked ? queryParams.set('adjective', isAdjectiveChecked.toString()) : queryParams.delete('adjective');
    isNounChecked ? queryParams.set('noun', isNounChecked.toString()) : queryParams.delete('noun');
    isVerbChecked ? queryParams.set('verb', isVerbChecked.toString()) : queryParams.delete('verb');

    word ? queryParams.set('searchByWord', word) : queryParams.delete('searchByWord');

    navigate(`?${queryParams.toString()}`);

  };

  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      updateParamsInURL();
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };

  }, [isAdjectiveChecked, isNounChecked, isVerbChecked, word]);

  useEffect(() => {
    dispatch(setFilters(Object.fromEntries(searchParams)));
  }, [searchParams]);

  useEffect(() => {
    if (isAbleToSetSessionStorage && itemToRemove) {
      dispatch(removeFromFavorites(itemToRemove));
      setItemToRemove(null);
      sessionStorage.setItem('myFavoriteWordsData', JSON.stringify(favorites));
    }
  }, [isAbleToSetSessionStorage, itemToRemove]);

  useEffect(() => {
    sessionStorage.getItem('myFavoriteWordsData') && dispatch(
      setData(JSON.parse(sessionStorage.getItem('myFavoriteWordsData') as any)));
  }, []);

  return (
    <div className="container w-full mt-10 h-1/6 flex justify-between ">

      <div className="bg-neutral-400 h-200 w-1/3 flex flex-col items-center">

        <input type="text"
               className="flex justify-center h-10 mt-5 rounded w-3/4 p-2 pr-10"
               placeholder="Поиск"
               onChange={e => setWord(e.currentTarget.value)}/>

        <div className="flex flex-col w-3/4 mt-2 ">
          <label>
            <input className="mr-2"
                   type="checkbox"
                   checked={isAdjectiveChecked}
                   onChange={(e) => {
                     setIsAdjectiveChecked(e.currentTarget.checked);
                   }}/>
            adjective
          </label>
          <label>
            <input className="mr-2"
                   type="checkbox"
                   checked={isNounChecked}
                   onChange={(e) => {
                     setIsNounChecked(e.currentTarget.checked);
                   }}/>
            noun
          </label>
          <label>
            <input
              className="mr-2"
              type="checkbox"
              checked={isVerbChecked}
              onChange={(e) => {
                setIsVerbChecked(e.currentTarget.checked);
              }}/>
            verb
          </label>
        </div>

      </div>

      {loading
        ? <div className="flex mt-10 items-center justify-center w-2/4">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-500"></div>
        </div>
        : <div className=" relative w-2/4 ml-15 flex-grow flex flex-col h-max">
          <Paginator
            onclickHandlerRemove={(item: DictionaryEntry) => onclickHandlerRemove(item)}
            isAbleToSetSessionStorage={isAbleToSetSessionStorage}
            onItemClickHandler={onItemClickHandler}
          />
        </div>
      }

    </div>
  );
};

export default StarredWords;