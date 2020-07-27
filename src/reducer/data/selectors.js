import NameSpace from '../name-space.js';
import {ALL_GENRES} from '../../const.js';

export const getGenres = (state) => {
  const films = state[NameSpace.DATA].films;
  const availableGenre = new Set(films.map((film) => film.genre));
  return [ALL_GENRES, ...availableGenre];
};

export const getFilms = (state) => state[NameSpace.DATA].films;

export const getFilmById = (state, filmID) => {
  const films = state[NameSpace.DATA].films;
  return films.find((film) => film.id === filmID && film);
};

export const getFavoriteFilms = (state) => state[NameSpace.DATA].favoriteFilms;

export const getPromo = (state) => state[NameSpace.DATA].moviePoster;

export const getFilmComments = (state) => state[NameSpace.DATA].comments;

export const getFilmsStatus = (state) => ({
  filmsIsLoading: state[NameSpace.DATA].loadingFilms,
  loadingIsError: state[NameSpace.DATA].loadFilmsError,
});

export const getFavoriteFilmsStatus = (state) => ({
  favoriteFilmIsLoading: state[NameSpace.DATA].loadingFavoriteFilms,
  loadingIsError: state[NameSpace.DATA].loadFavoriteFilmsError,
});

export const getPromoStatus = (state) => ({
  promoIsLoading: state[NameSpace.DATA].loadingPromo,
  loadingIsError: state[NameSpace.DATA].loadPromoError,
});

export const getCommetsStatus = (state) => ({
  commentsIsLoading: state[NameSpace.DATA].loadingComments,
  loadingIsError: state[NameSpace.DATA].loadCommentsError,
});

export const sendCommentStatus = (state) => ({
  commentsIsSending: state[NameSpace.DATA].sendingComment,
  sendingIsError: state[NameSpace.DATA].sendCommentError,
  sendingIsDone: state[NameSpace.DATA].sendCommentDone,
});
