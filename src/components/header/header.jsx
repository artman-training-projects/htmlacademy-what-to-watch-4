import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Pages} from '../../const.js';
import {getCurrentPage} from '../../reducer/app/selectors.js';

const Header = (props) => {
  const {currentPage} = props;
  const linkOnMain = currentPage !== Pages.MAIN ? `/` : null;

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <a href={linkOnMain} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="user-block">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentPage: getCurrentPage(state),
});

export default connect(mapStateToProps)(Header);
