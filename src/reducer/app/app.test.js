import {Pages} from '../../const.js';
import {ActionType, reducer} from './app.js';

describe(`Reducer App`, () => {
  it(`Should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      currentPage: Pages.MAIN
    });
  });

  it(`Should return currentPage /movie-card`, () => {
    expect(reducer({
      currentPage: Pages.MAIN,
    }, {
      type: ActionType.SET_CURRENT_PAGE,
      payload: Pages.FILM,
    })).toEqual({
      currentPage: Pages.FILM,
    });
  });

  it(`Should return currentPage /sign-in`, () => {
    expect(reducer({
      currentPage: Pages.MAIN,
    }, {
      type: ActionType.SET_CURRENT_PAGE,
      payload: Pages.SIGN_IN,
    })).toEqual({
      currentPage: Pages.SIGN_IN,
    });
  });

  it(`Should return currentPage /review`, () => {
    expect(reducer({
      currentPage: Pages.FILM,
    }, {
      type: ActionType.SET_CURRENT_PAGE,
      payload: Pages.ADD_REVIEW,
    })).toEqual({
      currentPage: Pages.ADD_REVIEW,
    });
  });
});
