import React from 'react';
import PropTypes from 'prop-types';

const MovieNavTabs = (prop) => {
  const {tabs, currentTab, onTabClick} = prop;
  const navItems = Object.values(tabs);

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {navItems.map((tab) => (
          <li key={tab}
            className={currentTab === tab ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}
            onClick={(evt) => {
              evt.preventDefault();
              onTabClick(tab);
            }}
          >
            <a href="#" className="movie-nav__link">{tab}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MovieNavTabs;

MovieNavTabs.propTypes = {
  tabs: PropTypes.objectOf(PropTypes.string).isRequired,
  currentTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};
