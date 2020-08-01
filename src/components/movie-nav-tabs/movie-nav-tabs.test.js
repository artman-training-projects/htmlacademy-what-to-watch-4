import * as React from 'react';
import renderer from 'react-test-renderer';
import MovieNavTabs from './movie-nav-tabs';

const MovieNavList = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

describe(`MovieNavTabs`, () => {
  it(`Render MovieNavTabs`, () => {
    const tree = renderer.create(
        <MovieNavTabs
          activeTab={MovieNavList.OVERVIEW}
          onActiveTabChange={() => {}}
          tabs={MovieNavList}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
