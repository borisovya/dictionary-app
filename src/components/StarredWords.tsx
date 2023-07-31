import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  addToFavorites,
  removeFromFavorites,
  searchFromFavorites, setData,
  toggleAdjective,
  toggleNoun,
  toggleVerb
} from '../store/reducer/favoritesSlice';

const StarredWords = () => {
  const [word, setWord] = useState<string>('');
  const [isAbleToSetSessionStorage, setIsAbleToSetSessionStorage] = useState<boolean>(false);
  const favorites = useAppSelector(state => state.favorites.data);
  const filtered = useAppSelector(state => state.favorites.filteredData);
  const isAdjectiveChecked = useAppSelector((state) => state.favorites.isAdjectiveChecked);
  const isNounChecked = useAppSelector((state) => state.favorites.isNounChecked);
  const isVerbChecked = useAppSelector((state) => state.favorites.isVerbChecked);
  const ids = useAppSelector(state => state.favorites.ids);
  const dispatch = useAppDispatch();

  const onclickHandlerRemove = (str: string) => {
    setIsAbleToSetSessionStorage(true)
    dispatch(removeFromFavorites(str));

  };

  useEffect(() => {
    isAbleToSetSessionStorage && sessionStorage.setItem('myFavoriteWordsData', JSON.stringify(favorites));
  }, [favorites]);

  // useEffect(() => {
  //   if (word) {
  //     dispatch(searchFromFavorites(word));
  //   }
  // }, [word]);


  useEffect(() => {
    dispatch(setData(JSON.parse(sessionStorage.getItem('myFavoriteWordsData') as any)));
  }, []);

  // if (word && filtered) {
  //   return (
  //     <div className="container w-full mt-10 h-1/6 flex justify-between ">
  //
  //       <div className="bg-neutral-400 h-200 w-1/3 flex flex-col items-center">
  //
  //         <input type="text"
  //                className="flex justify-center h-10 mt-5 rounded w-3/4 p-2 pr-10"
  //                placeholder="Поиск"
  //                onChange={e => setWord(e.currentTarget.value)}/>
  //
  //         <div className="flex flex-col w-3/4 mt-2 ">
  //           <label>
  //             <input className="mr-2" type="checkbox" checked={isAdjectiveChecked}
  //                    onChange={() => dispatch(toggleAdjective())}/>
  //             adjective
  //           </label>
  //           <label>
  //             <input className="mr-2" type="checkbox" checked={isNounChecked} onChange={() => dispatch(toggleNoun())}/>
  //             noun
  //           </label>
  //           <label>
  //             <input className="mr-2" type="checkbox" checked={isVerbChecked} onChange={() => toggleVerb}/>
  //             verb
  //           </label>
  //         </div>
  //
  //       </div>
  //
  //       <div className=" relative w-2/4 ml-15 flex-grow flex flex-col h-max">
  //         {filtered && filtered.length > 0 && filtered.map((i, index) => {
  //           return <div className="flex bg-blue-50 h-10 mb-5 justify-between items-center ml-5 " key={index}>
  //             <div className="flex font-bold w-2/6 ml-2">{i.hwi?.hw ?? '-'}</div>
  //             <div className="flex italic w-2/6 mr-4">{i.fl ?? '-'}</div>
  //             <div className="flex w-3/4 truncate  mr-8">{i.shortdef ? i.shortdef[0] : '-'}</div>
  //             <div className="flex w-1/10">
  //               {!ids.includes(i.meta.id)
  //                 ? <div className="flex ml-2 mr-4 cursor-pointer text-gray-400"
  //                        onClick={() => onclickHandler(i)}>&#9733;</div>
  //                 : <div className="flex ml-2 mr-4 cursor-pointer text-blue-400"
  //                        onClick={() => onclickHandlerRemove(i)}>&#9733;</div>
  //               }
  //             </div>
  //           </div>;
  //         })
  //         }
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container w-full mt-10 h-1/6 flex justify-between ">

      <div className="bg-neutral-400 h-200 w-1/3 flex flex-col items-center">

        <input type="text"
               className="flex justify-center h-10 mt-5 rounded w-3/4 p-2 pr-10"
               placeholder="Поиск"
               onChange={e => setWord(e.currentTarget.value)}/>

        <div className="flex flex-col w-3/4 mt-2 ">
          <label>
            <input className="mr-2" type="checkbox" checked={isAdjectiveChecked}
                   onChange={() => dispatch(toggleAdjective())}/>
            adjective
          </label>
          <label>
            <input className="mr-2" type="checkbox" checked={isNounChecked} onChange={() => dispatch(toggleNoun())}/>
            noun
          </label>
          <label>
            <input className="mr-2" type="checkbox" checked={isVerbChecked} onChange={() => toggleVerb}/>
            verb
          </label>
        </div>

      </div>

      <div className=" relative w-2/4 ml-15 flex-grow flex flex-col h-max">
        {Array.isArray(favorites) && favorites.length > 0 && favorites.map((i, index) => {
          return <div className="flex bg-blue-50 h-10 mb-5 justify-between items-center ml-5 " key={index}>
            <div className="flex font-bold w-2/6 ml-2">{i.hwi?.hw ?? '-'}</div>
            <div className="flex italic w-2/6 mr-4">{i.fl ?? '-'}</div>
            <div className="flex w-3/4 truncate  mr-8">{i.shortdef ? i.shortdef[0] : '-'}</div>
            <div className="flex w-1/10">
              <div className="flex ml-2 mr-4 cursor-pointer text-blue-400"
                   onClick={() => onclickHandlerRemove(i)}>&#9733;</div>
            </div>
          </div>;
        })
        }

      </div>

    </div>
  );
};

export default StarredWords;