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
  films: [],
  moviePoster: false,
  comments: false,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),

  loadPromo: (promo) => ({
    type: ActionType.LOAD_PROMO,
    payload: promo,
  }),

  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),
};

const Operations = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(EntryPoints.FILMS)
      .then((responce) => dispatch(ActionCreator.loadFilms(responce.data.map((film) => filmAdapter(film)))))
      .catch((err) => {
        throw err;
      });
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(EntryPoints.PROMO)
      .then((responce) => dispatch(ActionCreator.loadPromo(filmAdapter(responce.data))))
      .catch((err) => {
        throw err;
      });
  },

  loadComments: (filmID) => (dispatch, getState, api) => {
    return api.get(`${EntryPoints.COMMENTS}${filmID}`)
      .then((responce) => dispatch(ActionCreator.loadComments(responce.data)))
      .catch((err) => {
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
      });

    case ActionType.LOAD_PROMO:
      return extend(state, {
        moviePoster: action.payload,
      });

    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });

    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operations, reducer};
