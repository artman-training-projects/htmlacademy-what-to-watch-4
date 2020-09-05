import * as React from 'react';
import {HashRouter} from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {MyList} from './my-list';
import {films, history, moviePoster, noop, user} from '../data-test-set';
import NameSpace from '../../reducer/name-space';

const mockStore = configureStore([]);

describe(`MyList`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      authorizationError: false,
      authorizationInProgress: false,
      user,
    },
    [NameSpace.DATA]: {
      films,
      moviePoster,
    },
  });

  it(`Render MyList`, () => {
    const tree = renderer.create(
        <HashRouter>
          <Provider store={store}>
            <MyList
              loadingFavoriteFilm={{
                favoriteFilmIsLoading: false,
                loadingIsError: false,
              }}
              favoriteFilms={films}
              history={history}
              loadFavoriteFilms={noop}
              user={user}
            />
          </Provider>
        </HashRouter>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
