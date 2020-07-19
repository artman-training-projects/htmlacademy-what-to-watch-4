import {ActionType, reducer} from './show-films.js';

describe(`Reducer show-film`, () => {
  it(`Should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      currentGenre: `All genres`,
      filmsByGenre: [],
    });
  });

  it(`Return currentGenre after change`, () => {
    expect(reducer({
      currentGenre: `All Genres`,
    }, {
      type: ActionType.CHOOSE_GENRE,
      payload: (`Drama`),
    })).toEqual({
      currentGenre: `Drama`,
    });
  });
});
