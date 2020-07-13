import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {ALL_GENRES, Pages} from './const.js';
import {getAvailableGenres} from './utils.js';
import films from './mocks/films.js';
import moviePoster from './mocks/movie-poster.js';

import {reducer} from './store/reducer.js';
import App from './components/app/app.jsx';
import withSelectedFilm from './hoc/with-selected-film/with-selected-film.jsx';

const AppWrapped = withSelectedFilm(App);

const ENTRY_POINT = document.querySelector(`#root`);

const initialState = {
  availableGenres: getAvailableGenres(films),
  currentGenre: ALL_GENRES,
  currentPage: Pages.MAIN,
  films,
  filmsByGenre: films,
  moviePoster,
};

const store = createStore(
    reducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);

ReactDom.render(
    <Provider store={store}>
      <AppWrapped />
    </Provider>,
    ENTRY_POINT
);
