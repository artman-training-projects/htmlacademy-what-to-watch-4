import NameSpace from '../name-space.js';
import {ALL_GENRES} from '../../const.js';

export const getGenres = (state) => {
  const films = state[NameSpace.DATA].films;
  const availableGenre = new Set(films.map((film) => film.genre));
  return [ALL_GENRES, ...availableGenre];
};

export const getFilms = (state) => state[NameSpace.DATA].films;

export const getPromo = (state) => state[NameSpace.DATA].moviePoster;
