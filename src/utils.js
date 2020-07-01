import {ALL_GENRES} from './const.js';

export const getAvailableGenres = (films) => {
  const availableGenre = new Set(films.map((film) => film.genre));
  return [ALL_GENRES, ...availableGenre];
};
