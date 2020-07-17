import React from 'react';
import ReactDom from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {createAPI} from './api.js';
import reducer from './reducer/reducer.js';
import {Operations as DataOperations} from './reducer/data/data.js';

import App from './components/app/app.jsx';
import withSelectedFilm from './hoc/with-selected-film/with-selected-film.jsx';

const AppWrapped = withSelectedFilm(App);

const ENTRY_POINT = document.querySelector(`#root`);

const api = createAPI();

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
);

store.dispatch(DataOperations.loadPromo());
store.dispatch(DataOperations.loadFilms());

ReactDom.render(
    <Provider store={store}>
      <AppWrapped />
    </Provider>,
    ENTRY_POINT
);
