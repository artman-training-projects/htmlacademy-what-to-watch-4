const extend = (a, b) => Object.assign({}, a, b);

const ActionType = {
  CHOOSE_GENRE: `CHOOSE_GENRE`,
  GET_ALL_FILMS: `GET_ALL_FILMS`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
  SET_CURRENT_PAGE: `SET_CURRENT_PAGE`,
};

const ActionCreator = {
  chooseGenre: (genre) => ({
    type: ActionType.CHOOSE_GENRE,
    payload: genre,
  }),

  getAllFilms: (films) => ({
    type: ActionType.GET_ALL_FILMS,
    payload: films,
  }),

  getFilmsByGenre: (selectedGenre, films) => {
    const filmsByGenre = films
        .filter((film) => film.genre === selectedGenre);

    return {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: filmsByGenre,
    };
  },

  setCurrentPage: (page) => ({
    type: ActionType.SET_CURRENT_PAGE,
    payload: page,
  })
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.CHOOSE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.GET_ALL_FILMS:
      return extend(state, {
        filmsByGenre: action.payload
      });

    case ActionType.GET_FILMS_BY_GENRE:
      return extend(state, {
        filmsByGenre: action.payload,
      });

    case ActionType.SET_CURRENT_PAGE:
      return extend(state, {
        currentPage: action.payload,
      });

    default:
      return state;
  }
};

export {ActionType, ActionCreator, reducer};
