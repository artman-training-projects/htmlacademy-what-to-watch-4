import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from './main.jsx';

const MoviePoster = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drame`,
  YEAR: `2014`,
};

const films = [
  `Fantastic Beasts: The Crimes of Grindelwald`,
  `Bohemian Rhapsody`,
  `Macbeth`,
  `Aviator`,
  `We need to talk about Kevin`,
  `What We Do in the Shadows`,
  `Revenant`,
  `Johnny English`,
  `Shutter Island`,
  `Pulp Fiction`,
  `No Country for Old Men`,
  `Snatch`,
  `Moonrise Kingdom`,
  `Seven Years in Tibet`,
  `Midnight Special`,
  `War of the Worlds`,
  `Dardjeeling Limited`,
  `Orlando`,
  `Mindhunter`,
];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movieCardTitle clicked`, () => {
  const onSmallMovieCardTitleClick = jest.fn();

  const main = shallow(
      <Main
        movieTitle = {MoviePoster.TITLE}
        movieGenre = {MoviePoster.GENRE}
        movieYear = {MoviePoster.YEAR}
        films = {films}
        onSmallMovieCardTitleClick = {onSmallMovieCardTitleClick}
      />
  );

  const smallMovieCardTitles = main.find(`.small-movie-card__title`);
  smallMovieCardTitles.forEach((movieTitle) => movieTitle.props().onClick());
  expect(onSmallMovieCardTitleClick.mock.calls.length).toBe(smallMovieCardTitles.length);
});
