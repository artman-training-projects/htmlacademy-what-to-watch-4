import filmAdapter from '../../adapter/film';
import {extend} from '../utils';
import {ALL_GENRES} from '../../const';

const EntryPoints = {
  COMMENTS: `/comments/`,
  FAVORITE: `/favorite`,
  FILMS: `/films`,
  PROMO: `/films/promo`,
};

const initialState = {
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
};

const ActionType = {
  IS_LOADING_COMMENTS: `IS_LOADING_COMMENTS`,
  IS_LOADING_FILM: `IS_LOADING_FILM`,
  IS_LOADING_FAVORITE_FILM: `IS_LOADING_FAVORITE_FILM`,
  IS_LOADING_PROMO: `IS_LOADING_PROMO`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_COMMENTS_ERROR: `LOAD_COMMENTS_ERROR`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_FILMS_ERROR: `LOAD_FILMS_ERROR`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
  LOAD_FAVORITE_FILMS_ERROR: `LOAD_FAVORITE_FILMS_ERROR`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_PROMO_ERROR: `LOAD_PROMO_ERROR`,
  SEND_COMMENT: `SEND_COMMENT`,
  SEND_COMMENT_DONE: `SEND_COMMENT_DONE`,
  SEND_COMMENT_ERROR: `SEND_COMMENT_ERROR`,
  SEND_FAVORITE_FILM: `SEND_FAVORITE_FILM`,
  SEND_FAVORITE_FILM_DONE: `SEND_FAVORITE_FILM_DONE`,
  SEND_FAVORITE_FILM_ERROR: `SEND_FAVORITE_FILM_ERROR`,
};

const ActionCreator = {
  isloadingComments: (load) => ({
    type: ActionType.IS_LOADING_COMMENTS,
    payload: load,
  }),

  isLoadingFilm: (load) => ({
    type: ActionType.IS_LOADING_FILM,
    payload: load,
  }),

  isLoadingFavoriteFilm: (load) => ({
    type: ActionType.IS_LOADING_FAVORITE_FILM,
    payload: load,
  }),

  isLoadingPromo: (load) => ({
    type: ActionType.IS_LOADING_PROMO,
    payload: load,
  }),

  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),

  loadCommentsError: (error) => ({
    type: ActionType.LOAD_COMMENTS_ERROR,
    payload: error,
  }),

  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),

  loadFilmsError: (error) => ({
    type: ActionType.LOAD_FILMS_ERROR,
    payload: error,
  }),

  loadFavoriteFilms: (films) => ({
    type: ActionType.LOAD_FAVORITE_FILMS,
    payload: films,
  }),

  loadFavoriteFilmsError: (error) => ({
    type: ActionType.LOAD_FAVORITE_FILMS_ERROR,
    payload: error,
  }),

  loadPromo: (promo) => ({
    type: ActionType.LOAD_PROMO,
    payload: promo,
  }),

  loadPromoError: (error) => ({
    type: ActionType.LOAD_PROMO_ERROR,
    payload: error,
  }),

  isSendingComment: (review) => ({
    type: ActionType.SEND_COMMENT,
    payload: review,
  }),

  sendCommentDone: (done) => ({
    type: ActionType.SEND_COMMENT_DONE,
    payload: done,
  }),

  sendCommentError: (error) => ({
    type: ActionType.SEND_COMMENT_ERROR,
    payload: error,
  }),

  isSendingFavoriteFilm: (review) => ({
    type: ActionType.SEND_FAVORITE_FILM,
    payload: review,
  }),

  sendFavoriteFilmDone: (done) => ({
    type: ActionType.SEND_FAVORITE_FILM_DONE,
    payload: done,
  }),

  sendFavoriteFilmError: (error) => ({
    type: ActionType.SEND_FAVORITE_FILM_ERROR,
    payload: error,
  }),
};

const Operations = {
  loadComments: (filmID) => (dispatch, getState, api) => {
    return api.get(`${EntryPoints.COMMENTS}${filmID}`)
      .then((responce) => {
        dispatch(ActionCreator.loadComments(responce.data));
        dispatch(ActionCreator.isloadingComments(false));
        dispatch(ActionCreator.loadCommentsError(false));
        dispatch(ActionCreator.sendCommentDone(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadCommentsError(true));
        throw err;
      });
  },

  loadFilms: () => (dispatch, getState, api) => {
    return api.get(EntryPoints.FILMS)
      .then((responce) => {
        dispatch(ActionCreator.loadFilms(responce.data.map((film) => filmAdapter(film))));
        dispatch(ActionCreator.isLoadingFilm(false));
        dispatch(ActionCreator.loadFilmsError(false));
        dispatch(ActionCreator.sendFavoriteFilmDone(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadFilmsError(true));
        throw err;
      });
  },

  loadFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(EntryPoints.FAVORITE)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteFilms(response.data.map((film) => filmAdapter(film))));
        dispatch(ActionCreator.isLoadingFavoriteFilm(false));
        dispatch(ActionCreator.loadFavoriteFilmsError(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadFavoriteFilmsError(true));
        throw err;
      });
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(EntryPoints.PROMO)
      .then((responce) => {
        dispatch(ActionCreator.loadPromo(filmAdapter(responce.data)));
        dispatch(ActionCreator.isLoadingPromo(false));
        dispatch(ActionCreator.loadPromoError(false));
        dispatch(ActionCreator.sendFavoriteFilmDone(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadPromoError(true));
        throw err;
      });
  },

  sendComment: (filmID, review) => (dispatch, getState, api) => {
    dispatch(ActionCreator.isSendingComment(true));
    return api.post(`${EntryPoints.COMMENTS}${filmID}`, {
      rating: review.rating,
      comment: review.comment,
    })
    .then(() => {
      dispatch(ActionCreator.isSendingComment(false));
      dispatch(ActionCreator.sendCommentError(false));
      dispatch(ActionCreator.sendCommentDone(true));
    })
    .catch((err) => {
      dispatch(ActionCreator.sendCommentError(true));
      dispatch(ActionCreator.sendCommentDone(false));
      throw err;
    });
  },

  sendFavoriteFilm: (filmID, isFavorite) => (dispatch, getState, api) => {
    const status = isFavorite ? 0 : 1;
    dispatch(ActionCreator.isSendingFavoriteFilm(true));
    return api.post(`${EntryPoints.FAVORITE}/${filmID}/${status}`, {
      [`is_favorite`]: isFavorite,
    })
      .then(() => {
        dispatch(ActionCreator.isSendingFavoriteFilm(false));
        dispatch(ActionCreator.sendFavoriteFilmError(false));
        dispatch(ActionCreator.sendFavoriteFilmDone(true));
      })
      .catch((err) => {
        dispatch(ActionCreator.sendFavoriteFilmError(true));
        dispatch(ActionCreator.sendFavoriteFilmDone(false));
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.IS_LOADING_COMMENTS:
      return extend(state, {
        loadingComments: action.payload,
      });

    case ActionType.IS_LOADING_FILM:
      return extend(state, {
        loadingFilms: action.payload,
      });

    case ActionType.IS_LOADING_FAVORITE_FILM:
      return extend(state, {
        loadingFavoriteFilms: action.payload,
      });

    case ActionType.IS_LOADING_PROMO:
      return extend(state, {
        loadingPromo: action.payload,
      });

    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });

    case ActionType.LOAD_COMMENTS_ERROR:
      return extend(state, {
        loadCommentsError: action.payload,
      });

    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
      });

    case ActionType.LOAD_FILMS_ERROR:
      return extend(state, {
        loadFilmsError: action.payload,
      });

    case ActionType.LOAD_FAVORITE_FILMS:
      return extend(state, {
        favoriteFilms: action.payload,
      });

    case ActionType.LOAD_FAVORITE_FILMS_ERROR:
      return extend(state, {
        loadFavoriteFilmsError: action.payload,
      });

    case ActionType.LOAD_PROMO:
      return extend(state, {
        moviePoster: action.payload,
      });

    case ActionType.LOAD_PROMO_ERROR:
      return extend(state, {
        loadPromoError: action.payload,
      });

    case ActionType.SEND_COMMENT:
      return extend(state, {
        sendingComment: action.payload,
      });

    case ActionType.SEND_COMMENT_DONE:
      return extend(state, {
        sendCommentDone: action.payload,
      });

    case ActionType.SEND_COMMENT_ERROR:
      return extend(state, {
        sendCommentError: action.payload,
      });

    case ActionType.SEND_FAVORITE_FILM:
      return extend(state, {
        sendingFavoriteFilm: action.payload,
      });

    case ActionType.SEND_FAVORITE_FILM_DONE:
      return extend(state, {
        sendFavoriteFilmDone: action.payload,
      });

    case ActionType.SEND_FAVORITE_FILM_ERROR:
      return extend(state, {
        sendFavoriteFilmError: action.payload,
      });

    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operations, reducer};
