import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';

import {ALL_GENRES} from '../../const.js';
import {ActionType, Operations, reducer} from './data.js';
import {films, moviePoster, comments} from '../../components/data-for-test.js';
import filmAdapter from '../../adapter/film.js';

const api = createAPI(() => {});

describe(`Operations Data`, () => {
  it(`Should make a correct API call to get /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operations.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_FILMS,
          payload: [filmAdapter({fake: true})],
        });
      });
  });

  it(`Should make a correct API call to get /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoLoader = Operations.loadPromo();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return promoLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_PROMO,
          payload: filmAdapter({fake: true}),
        });
      });
  });

  it(`Should make a correct API call to get /comments/filmID`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operations.loadComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_COMMENTS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to post /comments/filmID`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentSending = Operations.sendComment(0, {
      rating: `5`,
      comment: `review`,
    });

    apiMock
      .onPost(`/comments/0`)
      .reply(200, [{fake: true}]);

    return commentSending(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SEND_COMMENT,
          payload: true,
        });
      });
  });
});

describe(`Reducer Data`, () => {
  it(`Should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      availableGenres: [ALL_GENRES],
      comments: false,
      films: [],
      favoriteFilms: [],
      moviePoster: false,
      loadingComments: true,
      loadCommentsError: false,
      loadingFilms: true,
      loadFilmsError: false,
      loadingFavoriteFilms: true,
      loadFavoriteFilmsError: false,
      loadingPromo: true,
      loadPromoError: false,
      sendingComment: false,
      sendCommentDone: false,
      sendCommentError: false,
      sendingFavoriteFilm: false,
      sendFavoriteFilmDone: false,
      sendFavoriteFilmError: false,
    });
  });

  it(`Should update films by load`, () => {
    expect(reducer({
      films: [],
    }, {
      type: ActionType.LOAD_FILMS,
      payload: films
    })).toEqual({
      films,
    });
  });

  it(`Should update films load status`, () => {
    expect(reducer({
      loadingFilms: true,
    }, {
      type: ActionType.IS_LOADING_FILM,
      payload: false
    })).toEqual({
      loadingFilms: false,
    });
  });

  it(`Should update films load error`, () => {
    expect(reducer({
      loadFilmsError: false,
    }, {
      type: ActionType.LOAD_FILMS_ERROR,
      payload: true
    })).toEqual({
      loadFilmsError: true,
    });
  });

  it(`Should update favoriteFilms by load`, () => {
    expect(reducer({
      favoriteFilms: true,
    }, {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: false
    })).toEqual({
      favoriteFilms: false,
    });
  });

  it(`Should update favoriteFilms load status`, () => {
    expect(reducer({
      loadingFavoriteFilms: true,
    }, {
      type: ActionType.IS_LOADING_FAVORITE_FILM,
      payload: false
    })).toEqual({
      loadingFavoriteFilms: false,
    });
  });

  it(`Should update favoriteFilms load error`, () => {
    expect(reducer({
      loadFavoriteFilmsError: false,
    }, {
      type: ActionType.LOAD_FAVORITE_FILMS_ERROR,
      payload: true
    })).toEqual({
      loadFavoriteFilmsError: true,
    });
  });

  it(`Should update promo by load`, () => {
    expect(reducer({
      moviePoster: false,
    }, {
      type: ActionType.LOAD_PROMO,
      payload: moviePoster
    })).toEqual({
      moviePoster,
    });
  });

  it(`Should update promo load status`, () => {
    expect(reducer({
      loadingPromo: true,
    }, {
      type: ActionType.IS_LOADING_PROMO,
      payload: false
    })).toEqual({
      loadingPromo: false,
    });
  });

  it(`Should update promo load error`, () => {
    expect(reducer({
      loadPromoError: false,
    }, {
      type: ActionType.LOAD_PROMO_ERROR,
      payload: true
    })).toEqual({
      loadPromoError: true,
    });
  });

  it(`Should update comments by load`, () => {
    expect(reducer({
      comments: false,
    }, {
      type: ActionType.LOAD_COMMENTS,
      payload: comments
    })).toEqual({
      comments,
    });
  });

  it(`Should update comments load status`, () => {
    expect(reducer({
      loadingComments: true,
    }, {
      type: ActionType.IS_LOADING_COMMENTS,
      payload: false
    })).toEqual({
      loadingComments: false,
    });
  });

  it(`Should update comments load error`, () => {
    expect(reducer({
      loadCommentsError: false,
    }, {
      type: ActionType.LOAD_COMMENTS_ERROR,
      payload: true
    })).toEqual({
      loadCommentsError: true,
    });
  });

  it(`Should update comment send status`, () => {
    expect(reducer({
      sendingComment: false,
    }, {
      type: ActionType.SEND_COMMENT,
      payload: true
    })).toEqual({
      sendingComment: true,
    });
  });

  it(`Should update comment send done`, () => {
    expect(reducer({
      sendCommentDone: false,
    }, {
      type: ActionType.SEND_COMMENT_DONE,
      payload: true
    })).toEqual({
      sendCommentDone: true,
    });
  });

  it(`Should update comment send error`, () => {
    expect(reducer({
      sendCommentError: false,
    }, {
      type: ActionType.SEND_COMMENT_ERROR,
      payload: true
    })).toEqual({
      sendCommentError: true,
    });
  });

  it(`Should update favoriteFilm send status`, () => {
    expect(reducer({
      sendingFavoriteFilm: false,
    }, {
      type: ActionType.SEND_FAVORITE_FILM,
      payload: true
    })).toEqual({
      sendingFavoriteFilm: true,
    });
  });

  it(`Should update favoriteFilm send done`, () => {
    expect(reducer({
      sendFavoriteFilmDone: false,
    }, {
      type: ActionType.SEND_FAVORITE_FILM_DONE,
      payload: true
    })).toEqual({
      sendFavoriteFilmDone: true,
    });
  });

  it(`Should update favoriteFilm send error`, () => {
    expect(reducer({
      sendFavoriteFilmError: false,
    }, {
      type: ActionType.SEND_FAVORITE_FILM_ERROR,
      payload: true
    })).toEqual({
      sendFavoriteFilmError: true,
    });
  });
});
