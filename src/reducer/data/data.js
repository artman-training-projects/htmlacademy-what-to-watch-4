import filmAdapter from '../../adapter/film.js';
import {extend} from '../utils.js';
import {ALL_GENRES} from '../../const.js';

const EntryPoints = {
  FILMS: `/films`,
  PROMO: `/films/promo`,
  COMMENTS: `/comments/`,
};

const initialState = {
  availableGenres: [ALL_GENRES],
  comments: false,
  films: [],
  moviePoster: false,
  loadingComments: true,
  loadingFilms: true,
  loadingPromo: true,
  loadCommentsError: false,
  loadFilmsError: false,
  loadPromoError: false,
};

const ActionType = {
  IS_LOADING_COMMENTS: `IS_LOADING_COMMENTS`,
  IS_LOADING_FILM: `IS_LOADING_FILM`,
  IS_LOADING_PROMO: `IS_LOADING_PROMO`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_COMMENTS_ERROR: `LOAD_COMMENTS_ERROR`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_FILMS_ERROR: `LOAD_FILMS_ERROR`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_PROMO_ERROR: `LOAD_PROMO_ERROR`,
};

const ActionCreator = {
  isloadingComments: (load) => ({
    type: ActionType.IS_LOADING_COMMENTS,
    payload: load,
  }),

  isLoadingFilm: (load) => ({
    type: ActionType.IS_LOADING_FILM,
    payload: load,
  }),

  isLoadingPromo: (load) => ({
    type: ActionType.IS_LOADING_PROMO,
    payload: load,
  }),

  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),

  loadCommentsError: (error) => ({
    type: ActionType.LOAD_COMMENTS_ERROR,
    payload: error,
  }),

  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),

  loadFilmsError: (error) => ({
    type: ActionType.LOAD_FILMS_ERROR,
    payload: error,
  }),

  loadPromo: (promo) => ({
    type: ActionType.LOAD_PROMO,
    payload: promo,
  }),

  loadPromoError: (error) => ({
    type: ActionType.LOAD_PROMO_ERROR,
    payload: error,
  }),
};

const Operations = {
  loadComments: (filmID) => (dispatch, getState, api) => {
    return api.get(`${EntryPoints.COMMENTS}${filmID}`)
      .then((responce) => {
        dispatch(ActionCreator.loadComments(responce.data));
        dispatch(ActionCreator.isloadingComments(false));
        dispatch(ActionCreator.loadCommentsError(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadCommentsError(true));
        throw err;
      });
  },

  loadFilms: () => (dispatch, getState, api) => {
    return api.get(EntryPoints.FILMS)
      .then((responce) => {
        dispatch(ActionCreator.loadFilms(responce.data.map((film) => filmAdapter(film))));
        dispatch(ActionCreator.isLoadingFilm(false));
        dispatch(ActionCreator.loadFilmsError(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadFilmsError(true));
        throw err;
      });
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(EntryPoints.PROMO)
      .then((responce) => {
        dispatch(ActionCreator.loadPromo(filmAdapter(responce.data)));
        dispatch(ActionCreator.isLoadingPromo(false));
        dispatch(ActionCreator.loadPromoError(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadPromoError(true));
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.IS_LOADING_COMMENTS:
      return extend(state, {
        loadingComments: action.payload,
      });

    case ActionType.IS_LOADING_FILM:
      return extend(state, {
        loadingFilms: action.payload,
      });

    case ActionType.IS_LOADING_PROMO:
      return extend(state, {
        loadingPromo: action.payload,
      });

    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });

    case ActionType.LOAD_COMMENTS_ERROR:
      return extend(state, {
        loadCommentsError: action.payload,
      });

    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
      });

    case ActionType.LOAD_FILMS_ERROR:
      return extend(state, {
        loadFilmsError: action.payload,
      });

    case ActionType.LOAD_PROMO:
      return extend(state, {
        moviePoster: action.payload,
      });

    case ActionType.LOAD_PROMO_ERROR:
      return extend(state, {
        loadPromoError: action.payload,
      });

    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operations, reducer};
