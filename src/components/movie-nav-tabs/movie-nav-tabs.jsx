import React from 'react';
import PropTypes from 'prop-types';

const MovieNavTabs = (prop) => {
  const {tabs, activeTab, onActiveTabChange} = prop;
  const navItems = Object.values(tabs);

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {navItems.map((tab) => (
          <li key={tab}
            className={activeTab === tab ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}
            onClick={(evt) => {
              evt.preventDefault();
              onActiveTabChange(tab);
            }}
          >
            <a href="#" className="movie-nav__link">{tab}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

MovieNavTabs.propTypes = {
  tabs: PropTypes.objectOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string.isRequired,
  onActiveTabChange: PropTypes.func.isRequired,
};

export default MovieNavTabs;
