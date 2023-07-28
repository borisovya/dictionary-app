
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  data: any[];
  ids: string[]
  filteredData: any[]
}

const initialState: FavoritesState = {
  data: [],
  ids: [],
  filteredData: []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<any>) {
      if (!state.data.includes(action.payload)) {
        state.data.push(action.payload)
        state.ids.push(action.payload.meta.id)
      }
    },
    removeFromFavorites(state, action: PayloadAction<any>) {
      state.data = state.data.filter((item) => item.meta.id !== action.payload.meta.id);
      state.ids = state.ids.filter((id) => id !== action.payload.meta.id);
    },
    searchFromFavorites(state, action: PayloadAction<string>) {
      state.filteredData = state.data.filter((item) => item.meta.id.split().join('').includes(action.payload) );
    },
  },
});

export const { addToFavorites, removeFromFavorites, searchFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
