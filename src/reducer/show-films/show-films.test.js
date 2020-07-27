import {ALL_GENRES} from '../../const.js';
import {moviePoster} from '../../components/data-for-test.js';
import {ActionType, reducer} from './show-films.js';

describe(`Reducer show-film`, () => {
  it(`Should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      currentGenre: ALL_GENRES,
      filmsByGenre: [],
      sameFilms: [],
      selectedFilm: false
    });
  });

  it(`Return selectedFilm after change`, () => {
    expect(reducer({
      selectedFilm: false,
    }, {
      type: ActionType.CHOOSE_FILM,
      payload: moviePoster,
    })).toEqual({
      selectedFilm: moviePoster,
    });
  });

  it(`Return currentGenre after change`, () => {
    expect(reducer({
      currentGenre: ALL_GENRES,
    }, {
      type: ActionType.CHOOSE_GENRE,
      payload: (`Drama`),
    })).toEqual({
      currentGenre: `Drama`,
    });
  });
});
