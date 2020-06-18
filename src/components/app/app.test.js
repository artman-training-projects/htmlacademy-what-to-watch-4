import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

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

it(`Render App`, () => {
  const tree = renderer
    .create(
        <App
          movieTitle = {moviePoster.title}
          movieGenre = {moviePoster.genre}
          movieYear = {moviePoster.year}
          films = {films}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
