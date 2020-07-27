import React from 'react';
import ReactDom from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {AuthorizationStatus} from './const.js';
import {createAPI} from './api.js';
import reducer from './reducer/reducer.js';
import {Operations as DataOperations} from './reducer/data/data.js';
import {ActionCreator, Operations as UserOperations} from './reducer/user/user.js';

import App from './components/app/app.jsx';

const ENTRY_POINT = document.querySelector(`#root`);

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
);

store.dispatch(UserOperations.checkAuth());
store.dispatch(DataOperations.loadPromo());
store.dispatch(DataOperations.loadFilms());

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    ENTRY_POINT
);
