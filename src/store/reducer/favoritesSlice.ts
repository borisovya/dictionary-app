import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FavoritesState {
  data: any[];
  ids: string[]
  filteredData: any[],
  isAdjectiveChecked: boolean
  isNounChecked: boolean
  isVerbChecked: boolean
}

const initialState: FavoritesState = {
  data: [],
  ids: [],
  filteredData: [],
  isAdjectiveChecked: false,
  isNounChecked: false,
  isVerbChecked: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
      state.ids = Array.isArray(action.payload) ? action.payload.map(el => el.meta.id) : []
    },
    addToFavorites(state, action: PayloadAction<any>) {
      if (state.data && !state.data.includes(action.payload)) {
        state.data.push(action.payload);
        state.ids.push(action.payload.meta.id);
      }
    },
    removeFromFavorites(state, action: PayloadAction<any>) {
      state.data = state.data.filter((item) => item.meta.id !== action.payload.meta.id);
      state.ids = state.ids.filter((id) => id !== action.payload.meta.id);
      console.log('item removed', state.data);
    },
    searchFromFavorites(state, action: PayloadAction<string>) {
      state.filteredData = state.data.filter((item) => item.meta.id.split().join('').includes(action.payload));
    },
    toggleAdjective(state) {
      state.isAdjectiveChecked = !state.isAdjectiveChecked;
    },
    toggleNoun(state) {
      state.isNounChecked = !state.isNounChecked;
    },
    toggleVerb(state) {
      state.isVerbChecked = !state.isVerbChecked;
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  searchFromFavorites,
  toggleAdjective,
  toggleNoun,
  toggleVerb,
  setData
} = favoritesSlice.actions;

export const selectFavoritesData = (state: RootState) => state.favorites.data;
export const selectFilteredData = (state: RootState) => state.favorites.filteredData;

export default favoritesSlice.reducer;
