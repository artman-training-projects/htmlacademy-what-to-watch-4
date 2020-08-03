import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CatalogMore from './catalog-more';
import {noop} from '../data-test-set';

describe(`CatalogMore`, () => {
  it(`Render`, () => {
    const tree = renderer.create(
        <CatalogMore
          onShowMoreClick={noop}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
