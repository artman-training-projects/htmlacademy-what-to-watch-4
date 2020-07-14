import React from 'react';
import ReactDom from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {Operations, reducer} from './reducer/reducer.js';
import {createAPI} from './api.js';

import {ALL_GENRES, Pages} from './const.js';
import App from './components/app/app.jsx';
import withSelectedFilm from './hoc/with-selected-film/with-selected-film.jsx';

const AppWrapped = withSelectedFilm(App);

const ENTRY_POINT = document.querySelector(`#root`);

const api = createAPI();

const initialState = {
  availableGenres: [ALL_GENRES],
  currentGenre: ALL_GENRES,
  currentPage: Pages.MAIN,
  films: [],
  filmsByGenre: [],
  moviePoster: {},
};

const store = createStore(
    reducer, initialState,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
);

store.dispatch(Operations.loadFilms());
store.dispatch(Operations.loadPromo());

ReactDom.render(
    <Provider store={store}>
      <AppWrapped />
    </Provider>,
    ENTRY_POINT
);
