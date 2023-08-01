// paginatorSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PaginatorState {
  items: any[];
  currentPage: number;
  itemsPerPage: number,
}

const initialState: PaginatorState = {
  items: [],
  currentPage: 1,
  itemsPerPage: 10,
};

const paginatorSlice = createSlice({
  name: 'paginator',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<any[]>) {
      state.items = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
  },
});

export const selectCurrentPageItems = (state: RootState) => {
  const { items, currentPage, itemsPerPage } = state.pagination;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  return items.slice(startIdx, endIdx);
};

export const { setItems, setCurrentPage, setItemsPerPage } = paginatorSlice.actions;
export default paginatorSlice.reducer;
