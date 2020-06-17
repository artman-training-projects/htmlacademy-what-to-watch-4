import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      onFilm: {},
    };
  }

  render() {
    const {films, onSmallMovieCardTitleClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film) => (
          <SmallMovieCard
            film = {film}
            key = {film.title}
            onSmallMovieCardTitleClick = {onSmallMovieCardTitleClick}
            onMouseOver = {(currentFilm) => {
              this.setState({
                onFilm: currentFilm,
              });
            }}
          />
        ))}
      </div>
    );
  }
}

export default MoviesList;

MoviesList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  })).isRequired,
  onSmallMovieCardTitleClick: PropTypes.func.isRequired,
};
