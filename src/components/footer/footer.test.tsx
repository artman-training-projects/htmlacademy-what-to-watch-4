import * as React from 'react';
import {Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';

import history from '../../history';
import Footer from './footer';

describe(`Footer`, () => {
  it(`Render`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Footer />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
