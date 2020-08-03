import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import CatalogMore from './catalog-more';

configure({adapter: new Adapter()});

describe(`CatalogMore`, () => {
  it(`Should showMore clicked`, () => {
    const handleShowMoreClick = jest.fn();

    const main = mount(
        <CatalogMore
          onShowMoreClick={handleShowMoreClick}
        />
    );

    const showMoreButton = main.find(`.catalog__button`);
    showMoreButton.simulate(`click`);
    expect(handleShowMoreClick).toHaveBeenCalled();
  });
});
