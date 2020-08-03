import * as React from 'react';

interface Props {
  activeTab: string;
  onActiveTabChange: (tab: {}) => void;
  tabs: {};
}

const MovieNavTabs: React.FC<Props> = (prop: Props) => {
  const {activeTab, onActiveTabChange, tabs} = prop;
  const navItems: string[] = Object.values(tabs);

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

export default MovieNavTabs;
