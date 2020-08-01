import * as React from 'react';
import {Films} from '../custom-types';

const MAX_VISIBLE_GENRES = 10;

interface Props {
  currentGenre: string;
  films: Films;
  genres: string[];
  onGenreClick: (genre: string, films: Films) => void;
  onResetShowClick: () => void;
}

const MovieNavGenre: React.FC<Props> = (props: Props) => {
  const {currentGenre, films, genres, onGenreClick, onResetShowClick} = props;
  const visibleGenres = genres.slice(0, MAX_VISIBLE_GENRES);

  return (
    <ul className="catalog__genres-list">
      {visibleGenres.map((genre) => (
        <li key={genre}
          className={currentGenre === genre ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}
          onClick={(evt) => {
            evt.preventDefault();
            onGenreClick(genre, films);
            onResetShowClick();
          }}
        >
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(MovieNavGenre);
