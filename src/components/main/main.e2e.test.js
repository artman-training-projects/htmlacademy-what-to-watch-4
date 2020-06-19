import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

const movieTitle = `Seven Years in Tibet`;
const movieGenre = `Drame`;
const movieYear = `1997`;

const films = [{
  title: `We need to talk about Kevin`,
  poster: `img/we-need-to-talk-about-kevin.jpg`,
},
{
  title: `What We Do in the Shadows`,
  poster: `img/what-we-do-in-the-shadows.jpg`,
},
{
  title: `Revenant`,
  poster: `img/revenant.jpg`,
},
{
  title: `Johnny English`,
  poster: `img/johnny-english.jpg`,
}];

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main`, () => {
  it(`Should movieCardTitle clicked`, () => {
    const onSmallMovieCardTitleClick = jest.fn();

    const main = shallow(
        <Main
          movieTitle = {movieTitle}
          movieGenre = {movieGenre}
          movieYear = {movieYear}
          films = {films}
          onSmallMovieCardTitleClick = {onSmallMovieCardTitleClick}
        />
    );

    const smallMovieCardTitles = main.find(`.small-movie-card__title`);
    smallMovieCardTitles.forEach((cardTitle) => cardTitle.props().onClick());
    expect(onSmallMovieCardTitleClick.mock.calls.length).toBe(smallMovieCardTitles.length);
  });
});
