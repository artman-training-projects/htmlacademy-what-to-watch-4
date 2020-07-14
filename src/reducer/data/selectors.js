import NameSpace from '../name-space.js';
import {ALL_GENRES, HttpErrors} from '../../const.js';

export const getGenres = (state) => {
  const films = state[NameSpace.DATA].films;
  if (films !== HttpErrors.NOT_FOUND) {
    const availableGenre = new Set(films.map((film) => film.genre));
    return [ALL_GENRES, ...availableGenre];
  }

  return [ALL_GENRES];
};

export const getFilms = (state) => state[NameSpace.DATA].films;

export const getPromo = (state) => state[NameSpace.DATA].moviePoster;

export const getFilmComments = (state) => state[NameSpace.DATA].comments;
