import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {reducer} from './store/reducer.js';
import App from './components/app/app.jsx';

import {ALL_GENRES} from './const.js';
import {getAvailableGenres} from './utils.js';
import films from './mocks/films.js';
import moviePoster from './mocks/movie-poster.js';

const ENTRY_POINT = document.querySelector(`#root`);

const initialState = {
  films,
  moviePoster,
  availableGenres: getAvailableGenres(films),
  currentGenre: ALL_GENRES,
  filmsByGenre: films,
};

const store = createStore(
    reducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    ENTRY_POINT
);
