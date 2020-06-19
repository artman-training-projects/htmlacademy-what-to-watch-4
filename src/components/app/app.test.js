import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

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

describe(`App`, () => {
  it(`Render App`, () => {
    const tree = renderer
      .create(
          <App
            movieTitle = {movieTitle}
            movieGenre = {movieGenre}
            movieYear = {movieYear}
            films = {films}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
