import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const moviePoster = {
  TITLE: `Seven Years in Tibet`,
  GENRE: `Drame`,
  YEAR: `1997`,
};

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

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main
          movieTitle = {moviePoster.title}
          movieGenre = {moviePoster.genre}
          movieYear = {moviePoster.year}
          films = {films}
          onSmallMovieCardTitleClick = {() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
