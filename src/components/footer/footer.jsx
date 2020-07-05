import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Pages} from '../../const.js';

const Footer = (props) => {
  const {currentPage} = props;
  const linkOnMain = currentPage !== Pages.MAIN ? `/` : null;

  return (
    <footer className="page-footer">
      <div className="logo">
        <a href={linkOnMain} className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
});

export default connect(mapStateToProps)(Footer);
