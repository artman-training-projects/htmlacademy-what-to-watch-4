import React from 'react';
import {Router} from 'react-router-dom';
import renderer from 'react-test-renderer';

import history from '../../history.js';
import Footer from './footer.jsx';

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
