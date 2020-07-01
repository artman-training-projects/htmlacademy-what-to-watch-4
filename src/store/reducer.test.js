import {getAvailableGenres} from '../utils.js';
import films from '../mocks/films.js';
import moviePoster from '../mocks/movie-poster.js';
import {ActionType, reducer} from './reducer.js';

const getFilmsByGenre = (selectedGenre) => {
  return films.filter((film) => film.genre === selectedGenre);
};

describe(`Reducer`, () => {
  it(`Return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      films,
      moviePoster,
      availableGenres: getAvailableGenres(films),
      currentGenre: `All genres`,
      filmsByGenre: films,
    });
  });

  it(`Return genre after choise`, () => {
    expect(reducer({
      currentGenre: `All genres`,
    }, {
      type: ActionType.CHOISE_GENRE,
      payload: `Drame`,
    })).toEqual({
      currentGenre: `Drame`,
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
