import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Loading from './loading';

describe(`Loading`, () => {
  it(`Render Loading`, () => {
    const tree = renderer.create(
        <Loading />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
