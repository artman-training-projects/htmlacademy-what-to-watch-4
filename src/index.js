import React from 'react';
import ReactDom from 'react-dom';

import App from './components/app/app.jsx';
import {MoviePoster, films} from './const.js';

const ENTRY_POINT = document.querySelector(`#root`);

ReactDom.render(
    <App
      movieTitle = {MoviePoster.TITLE}
      movieGenre = {MoviePoster.GENRE}
      movieYear = {MoviePoster.YEAR}
      films = {films}
    />,
    ENTRY_POINT
);
