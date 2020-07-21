import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {films} from '../../components/data-for-test.js';
import withSelectedFilm from './with-selected-film.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const mockComponent = () => {

  return (
    <div

    ></div>
  );
};

describe(`HOC withSelectedFilm`, () => {
  it(`Should withSelectedFilm film selected`, () => {
    const ComponentWrapped = withSelectedFilm(mockComponent);
    const handleFilmSelect = jest.fn();
    const selectedFilm = films[1];

    const wrapper = mount(
        <ComponentWrapped
          selectedFilm={selectedFilm}
          onFilmSelect={handleFilmSelect}
        />
    );

    wrapper.instance()._handleFilmSelect(selectedFilm);
    expect(wrapper.state().selectedFilm).toEqual(selectedFilm);
  });
});
