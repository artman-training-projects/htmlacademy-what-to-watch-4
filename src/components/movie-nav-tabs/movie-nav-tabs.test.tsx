import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MovieNavTabs from './movie-nav-tabs';
import {noop} from '../../components/data-test-set';

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
          onActiveTabChange={noop}
          tabs={MovieNavList}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
