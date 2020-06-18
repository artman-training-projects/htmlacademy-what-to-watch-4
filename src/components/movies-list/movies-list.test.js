import React from 'react';
import renderer from 'react-test-renderer';
import MoviesList from './movies-list.jsx';

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

it(`Render MoviesList`, () => {
  const tree = renderer
    .create(
        <MoviesList
          films = {films}
          onSmallMovieCardTitleClick = {() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
