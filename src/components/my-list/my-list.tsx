import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Films, User} from '../custom-types';

import {Pages} from '../../const';
import {getFavoriteFilms, getFavoriteFilmsStatus} from '../../reducer/data/selectors';
import {Operations as DataOperations} from '../../reducer/data/data';
import {getUserData} from '../../reducer/user/selectors';
import MoviesList from '../movies-list/movies-list';
import Footer from '../footer/footer';

interface Props {
  favoriteFilms: Films;
  history: any;
  loadingFavoriteFilm: {
    favoriteFilmIsLoading: boolean;
    loadingIsError: boolean;
  };
  loadFavoriteFilms: () => void;
  user: User;
}

class MyList extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavoriteFilms} = this.props;
    loadFavoriteFilms();
  }

  render() {
    const {favoriteFilms, history, loadingFavoriteFilm, user} = this.props;

    const isLoadingFavoriteFilms = () => {
      if (loadingFavoriteFilm.favoriteFilmIsLoading && !loadingFavoriteFilm.loadingIsError) {
        return `favorite films is loading...`;
      }

      if (loadingFavoriteFilm.favoriteFilmIsLoading && loadingFavoriteFilm.loadingIsError) {
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
            history={history}
          />
          }
        </section>

        <Footer />
      </div>
    </React.Fragment>);
  }
}

const mapStateToProps = (state) => ({
  favoriteFilms: getFavoriteFilms(state),
  loadingFavoriteFilm: getFavoriteFilmsStatus(state),
  user: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteFilms() {
    dispatch(DataOperations.loadFavoriteFilms());
  },
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
