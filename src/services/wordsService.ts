import axios from 'axios';
import {DictionaryEntry} from '../types/wordDetails';


export const instance = axios.create({
  baseURL: `https://www.dictionaryapi.com/api/v3/references/sd3/json`,
});


export const wordsService = {
  getWords: async function (requestWord: string) {
    try {
      const response = await instance.get<DictionaryEntry[]>(`/${requestWord}?key=eebee736-a6e0-4d40-8c30-478c185f0b11`);
      return response.data;
    }
    catch (error) {
      console.error('Ошибка при получении данных:', error);
      return null;
    }
  },
};
