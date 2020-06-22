import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';

import moviePoster from './mocks/movie-poster.js';
import films from './mocks/films.js';

const ENTRY_POINT = document.querySelector(`#root`);

ReactDom.render(
    <App
      films = {films}
      moviePoster = {moviePoster}
    />,
    ENTRY_POINT
);
