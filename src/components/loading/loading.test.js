import React from 'react';
import renderer from 'react-test-renderer';

import Loading from './loading.jsx';

describe(`Loading`, () => {
  it(`Render Loading`, () => {
    const tree = renderer.create(
        <Loading />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
