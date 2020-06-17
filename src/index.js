import React from 'react';
import ReactDom from 'react-dom';

import App from './components/app/app.jsx';
import moviePoster from './mocks/movie-poster.js';
import films from './mocks/films.js';

const ENTRY_POINT = document.querySelector(`#root`);

ReactDom.render(
    <App
      movieTitle = {moviePoster.title}
      movieGenre = {moviePoster.genre}
      movieYear = {moviePoster.year}
      films = {films}
    />,
    ENTRY_POINT
);
