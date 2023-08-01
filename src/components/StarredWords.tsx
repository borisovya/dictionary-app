import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  removeFromFavorites,
  setData,
  toggleAdjective,
  toggleNoun,
  toggleVerb,
} from '../store/reducer/favoritesSlice';
import Paginator from './Paginator';
import { useNavigate} from 'react-router-dom';

const StarredWords = () => {
  const [word, setWord] = useState<string>('');
  const favorites = useAppSelector((state) => state.favorites.data);
  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const [isAbleToSetSessionStorage, setIsAbleToSetSessionStorage] = useState<boolean>(false);
  const isAdjectiveChecked = useAppSelector((state) => state.favorites.isAdjectiveChecked);
  const isNounChecked = useAppSelector((state) => state.favorites.isNounChecked);
  const isVerbChecked = useAppSelector((state) => state.favorites.isVerbChecked);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams();

  const onclickHandlerRemove = (str: string) => {
    onItemClickHandler();
    setItemToRemove(str);
    dispatch(removeFromFavorites(str));
  };

  const onItemClickHandler = () => {
    setIsAbleToSetSessionStorage(true);
  };

  const setCheckBoxParams = () => {

    isAdjectiveChecked ? queryParams.set('adjective', isAdjectiveChecked.toString()) : queryParams.delete('adjective');
    isNounChecked ? queryParams.set('noun', isNounChecked.toString()) : queryParams.delete('noun');
    isVerbChecked ? queryParams.set('verb', isVerbChecked.toString()) : queryParams.delete('verb');

    navigate(`?${queryParams.toString()}`);
  };

  const setSearchWord = () => {
    word ? queryParams.set('searchByWord', word) : queryParams.delete('searchByWord')
  };

  useEffect(() => {
      setSearchWord()
      setCheckBoxParams();
  }, [isAdjectiveChecked, isNounChecked, isVerbChecked, word]);

  useEffect(() => {
    if (isAbleToSetSessionStorage && itemToRemove) {
      dispatch(removeFromFavorites(itemToRemove));
      setItemToRemove(null);
      sessionStorage.setItem('myFavoriteWordsData', JSON.stringify(favorites));
      console.log(JSON.parse(sessionStorage.getItem('myFavoriteWordsData') as any));
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
                   onChange={() => {
                     dispatch(toggleAdjective());
                   }}/>
            adjective
          </label>
          <label>
            <input className="mr-2"
                   type="checkbox"
                   checked={isNounChecked}
                   onChange={() => {
                     dispatch(toggleNoun());
                   }}/>
            noun
          </label>
          <label>
            <input
              className="mr-2"
              type="checkbox"
              checked={isVerbChecked}
              onChange={() => {
                dispatch(toggleVerb());
              }}/>
            verb
          </label>
        </div>

      </div>

      <div className=" relative w-2/4 ml-15 flex-grow flex flex-col h-max">
        <Paginator
          onclickHandlerRemove={onclickHandlerRemove}
          isAbleToSetSessionStorage={isAbleToSetSessionStorage}
          onItemClickHandler={onItemClickHandler}
        />
      </div>


    </div>
  );
};

export default StarredWords;