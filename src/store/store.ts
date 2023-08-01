import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './reducer/favoritesSlice';
import paginationReducer from './reducer/paginationSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    pagination: paginationReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
