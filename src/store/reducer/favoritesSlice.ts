import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DictionaryEntry} from '../../types/wordDetails';

type  Filters = {
  adjective: string
  noun: string
  verb: string
  searchByWord: string
}

interface FavoritesState {
  data: DictionaryEntry[];
  ids: string[]
  filteredData: DictionaryEntry[],
  filters: Partial<Filters>
}

const initialState: FavoritesState = {
  data: [],
  ids: [],
  filteredData: [],
  filters: {}
};

const applyFilters = (data: DictionaryEntry[], filters: Partial<Filters> | null): DictionaryEntry[] => {
  if (!filters || Object.keys(filters).length === 0) {
    return data;
  }

  const {adjective, noun, verb, searchByWord} = filters;

  if (searchByWord) {
    let filteredData: DictionaryEntry[] = data.filter(
      el => el.hwi.hw.toLowerCase().includes(searchByWord.toLowerCase()));

    if (adjective) {
      filteredData = filteredData.filter(el => el.fl === 'adjective');
    }
    if (noun) {
      filteredData = filteredData.filter(el => el.fl === 'noun');
    }
    if (verb) {
      filteredData = filteredData.filter(el => el.fl === 'verb');
    }

    return filteredData;
  }
  else {
    let filteredData: DictionaryEntry[] = [];

    const matchesAdjective = adjective && data.filter(el => el.fl === 'adjective');
    const matchesNoun = noun && data.filter(el => el.fl === 'noun');
    const matchesVerb = verb && data.filter(el => el.fl === 'verb');

    matchesAdjective && filteredData.push(...matchesAdjective);
    matchesNoun && filteredData.push(...matchesNoun);
    matchesVerb && filteredData.push(...matchesVerb);

    return filteredData;
  }
};


const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DictionaryEntry[]>) => {
      state.data = action.payload;
      state.ids = Array.isArray(action.payload) ? action.payload.map(el => el.meta.id) : [];
    },
    addToFavorites(state, action: PayloadAction<DictionaryEntry>) {
      if (state.data && !state.data.includes(action.payload)) {
        state.data.push(action.payload);
        state.ids.push(action.payload.meta.id);
      }
    },
    removeFromFavorites(state, action: PayloadAction<DictionaryEntry>) {
      state.data = state.data.filter((item) => item.meta.id !== action.payload.meta.id);
      state.ids = state.ids.filter((id) => id !== action.payload.meta.id);
    },
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = action.payload;
      state.filteredData = applyFilters(state.data, action.payload);
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  setData,
  setFilters
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
