import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CatalogMore from './catalog-more';

describe(`CatalogMore`, () => {
  it(`Render`, () => {
    const tree = renderer.create(
        <CatalogMore
          onShowMoreClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
