import {films} from '../components/data-for-test.js';
import {ActionType, reducer} from './reducer.js';

const getFilmsByGenre = (selectedGenre) => {
  return films.filter((film) => film.genre === selectedGenre);
};

const getAllFilms = (filmsList) => filmsList;

describe(`Reducer`, () => {
  it(`Return genre after choise`, () => {
    expect(reducer({
      currentGenre: `All genres`,
    }, {
      type: ActionType.CHOOSE_GENRE,
      payload: `Drame`,
    })).toEqual({
      currentGenre: `Drame`,
    });
  });

  it(`Return all films`, () => {
    expect(reducer({
      currentGenre: `All genres`,
    }, {
      type: ActionType.GET_ALL_FILMS,
      payload: getAllFilms(films),
    })).toEqual({
      currentGenre: `All genres`,
      filmsByGenre: getAllFilms(films),
    });
  });

  it(`Return films by genre`, () => {
    expect(reducer({
      currentGenre: `Drame`,
      filmsByGenre: films,
    }, {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: getFilmsByGenre(`Drame`),
    })).toEqual({
      currentGenre: `Drame`,
      filmsByGenre: getFilmsByGenre(`Drame`),
    });
  });
});
