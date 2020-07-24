import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {COUNT_OF_SHOW_FILMS} from '../../const.js';
import withCountFilms from './with-count-films.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const mockComponent = () => {

  return (
    <div

    ></div>
  );
};

describe(`HOC withCountFilms`, () => {
  const numberOfFilms = COUNT_OF_SHOW_FILMS;
  const handleCountShowFilmAdd = jest.fn();
  const handleCountShowFilmReset = jest.fn();

  it(`Should withCountFilms add showFilms`, () => {
    const ComponentWrapped = withCountFilms(mockComponent);

    const wrapper = mount(
        <ComponentWrapped
          numberOfFilms={numberOfFilms}
          onCountShowFilmAdd={handleCountShowFilmAdd}
          onCountShowFilmReset={handleCountShowFilmReset}
        />
    );

    wrapper.instance()._handleCountShowFilmAdd();
    expect(wrapper.state().numberOfFilms).toEqual(numberOfFilms + COUNT_OF_SHOW_FILMS);
  });

  it(`Should withCountFilms reset showFilms`, () => {
    const ComponentWrapped = withCountFilms(mockComponent);

    const wrapper = mount(
        <ComponentWrapped
          numberOfFilms={numberOfFilms}
          onCountShowFilmAdd={handleCountShowFilmAdd}
          onCountShowFilmReset={handleCountShowFilmReset}
        />
    );

    wrapper.instance()._handleCountShowFilmAdd();
    wrapper.instance()._handleCountShowFilmReset();
    expect(wrapper.state().numberOfFilms).toEqual(COUNT_OF_SHOW_FILMS);
  });
});
