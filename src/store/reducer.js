import {ALL_GENRES} from '../const.js';

const extend = (a, b) => Object.assign({}, a, b);

const ActionType = {
  CHOOSE_GENRE: `CHOOSE_GENRE`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
};

const ActionCreator = {
  chooseGenre: (genre) => ({
    type: ActionType.CHOOSE_GENRE,
    payload: genre,
  }),

  getFilmsByGenre: (selectedGenre = ALL_GENRES, films) => {
    let filmsByGenre = films;

    if (selectedGenre !== ALL_GENRES) {
      filmsByGenre = films
        .filter((film) => film.genre === selectedGenre);
    }

    return {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: filmsByGenre,
    };
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.CHOOSE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.GET_FILMS_BY_GENRE:
      return extend(state, {
        filmsByGenre: action.payload,
      });

    default:
      return state;
  }
};

export {ActionType, ActionCreator, reducer};
