import React from 'react';
import PropTypes from 'prop-types';

const MovieNavTabs = (prop) => {
  const {tabs, currentTab} = prop;

  const navItems = Object.values(tabs);

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {navItems.map((item) => (
          <li key={item} className={currentTab === item ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
            <a href="#" className="movie-nav__link">{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MovieNavTabs;

MovieNavTabs.prototype = {
  tabs: PropTypes.shape({
    OVERVIEW: PropTypes.string.isRequired,
    DETAILS: PropTypes.string.isRequired,
    REVIEWS: PropTypes.string.isRequired,
  }).isRequired,
  currentTab: PropTypes.string.isRequired,
};
