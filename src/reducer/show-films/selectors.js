import NameSpace from '../name-space.js';
import {ALL_GENRES} from '../../const.js';

const COUNT_OF_SAME_FILMS = 4;

export const getCurrentGenre = (state) => state[NameSpace.SHOW].currentGenre;

export const getSelectedFilm = (state) => state[NameSpace.SHOW].selectedFilm;

export const getFilmsByGenre = (state) => {
  const films = state[NameSpace.DATA].films;
  const currentGenre = state[NameSpace.SHOW].currentGenre;

  if (currentGenre === ALL_GENRES) {
    return films;
  }

  return films.filter((film) => film.genre === currentGenre);
};

export const getSameFilms = (state, selectedFilm) => {
  const films = state[NameSpace.DATA].films;

  const sameFilms = films
    .filter((movie) => movie.genre === selectedFilm.genre && movie.title !== selectedFilm.title)
    .slice(0, COUNT_OF_SAME_FILMS);

  return sameFilms;
};
