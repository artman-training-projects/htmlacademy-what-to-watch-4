import {extend} from '../utils.js';
import {ALL_GENRES} from '../../const.js';

const initialState = {
  currentGenre: ALL_GENRES,
  filmsByGenre: [],
  sameFilms: [],
  selectedFilm: false,
};

const ActionType = {
  CHOOSE_FILM: `CHOOSE_FILM`,
  CHOOSE_GENRE: `CHOOSE_GENRE`,
};

const ActionCreator = {
  chooseFilm: (film) => ({
    type: ActionType.CHOOSE_FILM,
    payload: film,
  }),

  chooseGenre: (genre) => ({
    type: ActionType.CHOOSE_GENRE,
    payload: genre,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHOOSE_FILM:
      return extend(state, {
        selectedFilm: action.payload,
      });

    case ActionType.CHOOSE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    default:
      return state;
  }
};

export {ActionCreator, ActionType, reducer};
