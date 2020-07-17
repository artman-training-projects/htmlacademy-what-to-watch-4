import {extend} from '../utils.js';
import {ALL_GENRES} from '../../const.js';

const initialState = {
  currentGenre: ALL_GENRES,
  filmsByGenre: [],
};

const ActionType = {
  CHOOSE_GENRE: `CHOOSE_GENRE`,
};

const ActionCreator = {
  chooseGenre: (genre) => ({
    type: ActionType.CHOOSE_GENRE,
    payload: genre,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHOOSE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    default:
      return state;
  }
};

export {ActionCreator, ActionType, reducer};
