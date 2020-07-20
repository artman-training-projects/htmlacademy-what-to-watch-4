import {ActionType, reducer} from './app.js';

describe(`Reducer App`, () => {
  it(`Should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      currentPage: `/`
    });
  });

  it(`Should return currentPage /movie-card`, () => {
    expect(reducer({
      currentPage: `/`,
    }, {
      type: ActionType.SET_CURRENT_PAGE,
      payload: `/movie-card`,
    })).toEqual({
      currentPage: `/movie-card`,
    });
  });

  it(`Should return currentPage /sign-in`, () => {
    expect(reducer({
      currentPage: `/`,
    }, {
      type: ActionType.SET_CURRENT_PAGE,
      payload: `/sign-in`,
    })).toEqual({
      currentPage: `/sign-in`,
    });
  });
});
