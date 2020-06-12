import React from 'react';
import ReactDom from 'react-dom';

import App from './app/app.jsx';

const ENTRY_POINT = document.querySelector(`#root`);

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

ReactDom.render(
    <App
      movieTitle = {MoviePoster.TITLE}
      movieGenre = {MoviePoster.GENRE}
      movieYear = {MoviePoster.YEAR}
      films = {films}
    />,
    ENTRY_POINT
);
