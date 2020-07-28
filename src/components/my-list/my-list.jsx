import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import {Pages} from '../../const.js';
import {getFavoriteFilms, getFavoriteFilmsStatus} from '../../reducer/data/selectors.js';
import {Operations as DataOperations} from '../../reducer/data/data.js';
import {getUserData} from '../../reducer/user/selector.js';
import {ActionCreator} from '../../reducer/show-films/show-films.js';
import MoviesList from '../movies-list/movies-list.jsx';
import Footer from '../footer/footer.jsx';

class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavoriteFilms} = this.props;
    loadFavoriteFilms();
  }

  render() {
    const {favoriteFilms, handleFilmChoose, loadingFavoriteFilm, user} = this.props;

    const isLoadingFavoriteFilms = () => {
      if (loadingFavoriteFilm.favoriteFilmIsLoading && !loadingFavoriteFilm.loadingIsError) {
        return `favorite films is loading...`;
      } else if (loadingFavoriteFilm.favoriteFilmIsLoading && loadingFavoriteFilm.loadingIsError) {
        return `server error, try later...`;
      }

      return false;
    };

    return (<React.Fragment>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={Pages.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">My list</h1>

          <div className="user-block">
            <div className="user-block__avatar">
              <Link to={Pages.MAIN}>
                <img src={user.avatarSrc} alt={user.name} width="63" height="63" />
              </Link>
            </div>
          </div>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          {isLoadingFavoriteFilms() ||
          <MoviesList
            films={favoriteFilms}
            onSmallMovieCardClick={handleFilmChoose}
          />
          }
        </section>

        <Footer />
      </div>
    </React.Fragment>);
  }
}

MyList.propTypes = {
  favoriteFilms: PropTypes.arrayOf(CustomPropTypes.FILM),
  handleFilmChoose: PropTypes.func.isRequired,
  loadingFavoriteFilm: PropTypes.shape({
    favoriteFilmIsLoading: PropTypes.bool.isRequired,
    loadingIsError: PropTypes.bool.isRequired,
  }),
  loadFavoriteFilms: PropTypes.func.isRequired,
  user: CustomPropTypes.USER,
};

const mapStateToProps = (state) => ({
  favoriteFilms: getFavoriteFilms(state),
  loadingFavoriteFilm: getFavoriteFilmsStatus(state),
  user: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleFilmChoose(film) {
    dispatch(ActionCreator.chooseFilm(film));
    dispatch(DataOperations.loadComments(film.id));
  },

  loadFavoriteFilms() {
    dispatch(DataOperations.loadFavoriteFilms());
  },
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
