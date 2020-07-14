import filmAdapter from '../../adapter/film.js';
import {extend} from '../utils.js';
import {ALL_GENRES} from '../../const.js';

const initialState = {
  availableGenres: [ALL_GENRES],
  films: [],
  moviePoster: false,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO: `LOAD_PROMO`,
};

const ActionCreator = {
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

    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operations, reducer};
