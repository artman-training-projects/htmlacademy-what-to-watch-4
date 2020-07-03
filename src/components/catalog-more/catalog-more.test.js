import React from 'react';
import renderer from 'react-test-renderer';
import CatalogMore from './catalog-more.jsx';

describe(`CatalogMore`, () => {
  it(`Render`, () => {
    const tree = renderer.create(
        <CatalogMore />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
