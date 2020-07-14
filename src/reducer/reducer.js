import filmAdapter from '../adapter/film.js';
import {getAvailableGenres} from '../utils.js';

const extend = (a, b) => Object.assign({}, a, b);

const ActionType = {
  CHOOSE_GENRE: `CHOOSE_GENRE`,
  GET_ALL_FILMS: `GET_ALL_FILMS`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
  SET_CURRENT_PAGE: `SET_CURRENT_PAGE`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO: `LOAD_PROMO`,
};

const ActionCreator = {
  chooseGenre: (genre) => ({
    type: ActionType.CHOOSE_GENRE,
    payload: genre,
  }),

  getAllFilms: (films) => ({
    type: ActionType.GET_ALL_FILMS,
    payload: films,
  }),

  getFilmsByGenre: (selectedGenre, films) => {
    const filmsByGenre = films
        .filter((film) => film.genre === selectedGenre);

    return {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: filmsByGenre,
    };
  },

  setCurrentPage: (page) => ({
    type: ActionType.SET_CURRENT_PAGE,
    payload: page,
  }),

  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),

  loadPromo: (promo) => ({
    type: ActionType.LOAD_PROMO,
    payload: promo,
  })
};

const Operations = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((responce) => dispatch(ActionCreator.loadFilms(responce.data.map((film) => filmAdapter(film)))));
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((responce) => dispatch(ActionCreator.loadPromo(filmAdapter(responce.data))));
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.CHOOSE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.GET_ALL_FILMS:
      return extend(state, {
        filmsByGenre: action.payload
      });

    case ActionType.GET_FILMS_BY_GENRE:
      return extend(state, {
        filmsByGenre: action.payload,
      });

    case ActionType.SET_CURRENT_PAGE:
      return extend(state, {
        currentPage: action.payload,
      });

    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
        filmsByGenre: action.payload,
        availableGenres: getAvailableGenres(action.payload),
      });

    case ActionType.LOAD_PROMO:
      return extend(state, {
        moviePoster: action.payload,
      });

    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operations, reducer};
