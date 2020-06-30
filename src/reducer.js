import films from './mocks/films.js';

const extend = (oldState, newState) => Object.assign({}, oldState, newState);

const initialState = {
  movieGenre: `All genres`,
  films,
};

const ActionType = {
  CHOISE_GENRE: `CHOISE_GENRE`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHOISE_GENRE:
      return extend(state, {
        movieGenre: action.payload,
      });

    case ActionType.GET_FILMS_BY_GENRE:
      return extend(state, {
        films: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType};
