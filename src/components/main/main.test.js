import React from 'react';
import renderer from 'react-test-renderer';
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

describe(`Main`, () => {
  it(`Render Main`, () => {
    const tree = renderer
      .create(
          <Main
            movieTitle = {movieTitle}
            movieGenre = {movieGenre}
            movieYear = {movieYear}
            films = {films}
            onSmallMovieCardTitleClick = {() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
