import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'src/store/store';
import {setCurrentPage} from '../store/reducer/paginationSlice';
import {setData} from '../store/reducer/favoritesSlice';
import {DictionaryEntry} from '../types/wordDetails';

type PaginatorProps = {
  onclickHandlerRemove: (item: DictionaryEntry) => void
  isAbleToSetSessionStorage: boolean
  onItemClickHandler: () => void
}
const Paginator = ({onclickHandlerRemove, isAbleToSetSessionStorage, onItemClickHandler}: PaginatorProps) => {
  const dispatch = useDispatch();
  const items = useAppSelector((state) => state.favorites.data);
  const filteredData = useAppSelector((state) => state.favorites.filteredData);
  const filters = useAppSelector((state) => state.favorites.filters);
  const {currentPage, itemsPerPage} = useAppSelector((state) => state.pagination);
  const [totalPages, setTotalPages] = useState(0)

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  const [draggedItems, setDraggedItems] = useState<any[]>([]);
  const [sessionStorageUpdated, setSessionStorageUpdated] = useState(false);

  const getCurrentPageItems = () => {
    if (Object.keys(filters).length > 0 && filteredData) {
      return filteredData.slice(startIdx, endIdx);
    }
    else
      return items.slice(startIdx, endIdx);
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    onItemClickHandler();
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', (startIdx + index).toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    const draggedIndex = Number(event.dataTransfer.getData('text/plain'));
    if (draggedIndex !== index) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(startIdx + index, 0, draggedItem);
      dispatch(setData(updatedItems));
      if (isAbleToSetSessionStorage) {
        setDraggedItems(updatedItems);
        setSessionStorageUpdated(true);
      }
    }
  };

  useEffect(() => {
    if (isAbleToSetSessionStorage && !sessionStorageUpdated) {
      const savedItems = sessionStorage.getItem('myFavoriteWordsData');
      if (savedItems) {
        dispatch(setData(JSON.parse(savedItems)));
        setDraggedItems(JSON.parse(savedItems));
      }
    }
  }, [dispatch, isAbleToSetSessionStorage, sessionStorageUpdated]);

  useEffect(() => {
    if (isAbleToSetSessionStorage && sessionStorageUpdated) {
      sessionStorage.setItem('myFavoriteWordsData', JSON.stringify(draggedItems));
      setSessionStorageUpdated(false);
    }
  }, [currentPage, draggedItems, isAbleToSetSessionStorage, sessionStorageUpdated]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [filters, dispatch]);

  useEffect(() => {
    if (Object.keys(filters).length > 0 && filteredData) {
      setTotalPages(Math.ceil(filteredData.length / itemsPerPage))
    }
    else setTotalPages(Math.ceil(items.length / itemsPerPage))
  }, [filters, onclickHandlerRemove]);

  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {getCurrentPageItems().map((item, index) => {
          return <div
            className="flex bg-blue-50 h-10 mb-5 justify-between items-center ml-5 "
            key={index}
            draggable
            onDragStart={e => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, index)}
          >
            <div className="flex font-bold w-2/6 ml-2">{item.hwi?.hw ?? '-'}</div>
            <div className="flex italic w-2/6 mr-4">{item.fl ?? '-'}</div>
            <div className="flex w-3/4 truncate  mr-8">{item.shortdef ? item.shortdef[0] : '-'}</div>
            <div className="flex w-1/10">
              <div className="flex ml-2 mr-4 cursor-pointer text-blue-400"
                   onClick={() => onclickHandlerRemove(item)}>&#9733;</div>
            </div>
          </div>;
        }
      )}

      <div className="ml-5 flex justify-center">
        <div className="">
          {Array.from({length: totalPages}).map((_, index) => (

            <button
              className={(index + 1) === currentPage ? 'ml-2 bg-blue-400 w-10 h10' : 'ml-5'}
              key={index}
              onClick={() => {
                handlePageChange(index + 1);
              }
              }>
              {index + 1}
            </button>
          ))}
        </div>

        {/*{Array.isArray(items) && items.length > 0 && <div className="fllex ml-5">*/}
        {/*  <select*/}
        {/*      value={itemsPerPage}*/}
        {/*      onChange={(e) => {*/}
        {/*        dispatch(setCurrentPage(1));*/}
        {/*        dispatch(setItemsPerPage(Number(e.target.value)));*/}
        {/*      }}>*/}

        {/*    <option value={5}>5</option>*/}
        {/*    <option value={10}>10</option>*/}

        {/*  </select>*/}
        {/*</div>}*/}
      </div>

    </div>
  );
};

export default Paginator;
