import {ActionType, reducer} from './show-films.js';

describe(`Reducer show-film`, () => {
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
