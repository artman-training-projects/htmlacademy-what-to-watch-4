import {extend} from '../utils.js';
import {Pages} from '../../const.js';

const initialState = {
  currentPage: Pages.MAIN,
};

const ActionType = {
  SET_CURRENT_PAGE: `SET_CURRENT_PAGE`,
};

const ActionCreator = {
  setCurrentPage: (page) => ({
    type: ActionType.SET_CURRENT_PAGE,
    payload: page,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_PAGE:
      return extend(state, {
        currentPage: action.payload,
      });

    default:
      return state;
  }
};

export {ActionCreator, ActionType, reducer};
