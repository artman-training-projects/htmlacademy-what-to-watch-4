import React from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';
import {connect} from 'react-redux';

import {AuthorizationStatus, Pages} from '../../const.js';
import {getCurrentPage} from '../../reducer/app/selectors.js';
import {getAuthStatus, getUserData} from '../../reducer/user/selector.js';

const Header = (props) => {
  const {
    authorizationStatus,
    currentPage,
    film,
    onFilmClick,
    onSignInClick,
    user
  } = props;

  const toFilmPage = () => `${Pages.MOVIE_CARD}/${film.id}`;

  const linkOnMain = currentPage !== Pages.MAIN ? `/` : null;

  const isReview = currentPage === Pages.REVIEW ?
    <React.Fragment>
      <nav className="breadcrumbs">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <a href={toFilmPage()} className="breadcrumbs__link"
              onClick={(evt) => {
                evt.preventDefault();
                onFilmClick();
              }}
            >{film.title}</a>
          </li>
          <li className="breadcrumbs__item">
            <a className="breadcrumbs__link">Add review</a>
          </li>
        </ul>
      </nav>
    </React.Fragment> : ``;

  const isSignIn = authorizationStatus === AuthorizationStatus.AUTH ?
    <React.Fragment>
      <div className="user-block">
        <div className="user-block__avatar">
          <img src={user.avatarSrc} alt={user.name} width="63" height="63" />
        </div>
      </div>
    </React.Fragment> :
    <React.Fragment>
      <div className="user-block">
        <a href={Pages.SIGN_IN} className="user-block__link"
          onClick={(evt) => {
            evt.preventDefault();
            onSignInClick();
          }}
        >Sign in</a>
      </div>
    </React.Fragment>;

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <a href={linkOnMain} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {isReview}

      {isSignIn}
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  currentPage: PropTypes.string.isRequired,
  film: CustomPropTypes.FILM,
  onFilmClick: PropTypes.func,
  onSignInClick: PropTypes.func,
  user: CustomPropTypes.USER,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatus(state),
  currentPage: getCurrentPage(state),
  user: getUserData(state),
});

export default connect(mapStateToProps)(Header);
