import React from 'react';
import ReactDom from 'react-dom';

import App from './app/app.jsx';

const MoviePoster = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drame`,
  YEAR: `2014`,
};

ReactDom.render(
    <App
      moviePoster = {MoviePoster}
    />,
    document.querySelector(`#root`)
);
