import * as React from 'react';
import * as ReactDom from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {AuthorizationStatus} from './const';
import {createAPI} from './api';
import reducer from './reducer/reducer';
import {Operations as DataOperations} from './reducer/data/data';
import {ActionCreator, Operations as UserOperations} from './reducer/user/user';

import App from './components/app/app';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);
const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(UserOperations.checkAuth());
store.dispatch(DataOperations.loadPromo());
store.dispatch(DataOperations.loadFilms());

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
