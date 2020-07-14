import {ActionType, reducer} from './app.js';

describe(`Reducer App`, () => {
  it(`Return currentPage after change`, () => {
    expect(reducer({
      currentPage: `/`,
    }, {
      type: ActionType.SET_CURRENT_PAGE,
      payload: (`/movie-card`),
    })).toEqual({
      currentPage: `/movie-card`,
    });
  });
});
