import NameSpace from '../name-space.js';
import {ALL_GENRES} from '../../const.js';

export const getCurrentGenre = (state) => state[NameSpace.SHOW].currentGenre;

export const getFilmsByGenre = (state) => {
  const films = state[NameSpace.DATA].films;
  const currentGenre = state[NameSpace.SHOW].currentGenre;

  if (currentGenre === ALL_GENRES) {
    return films;
  }

  return films.filter((film) => film.genre === currentGenre);
};
