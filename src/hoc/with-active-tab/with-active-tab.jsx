import React, {PureComponent} from 'react';
import {CustomPropTypes} from '../../components/custom-prop-types.js';

import {MovieNavList} from '../../const.js';
import MovieNavOverview from '../../components/movie-nav-overview/movie-nav-overview.jsx';
import MovieNavDetails from '../../components/movie-nav-details/movie-nav-details.jsx';
import MovieNavReviews from '../../components/movie-nav-reviews/movie-nav-reviews.jsx';

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: MovieNavList.OVERVIEW,
      };

      this._setActiveTab = this._setActiveTab.bind(this);
      this._renderActiveTab = this._renderActiveTab.bind(this);
    }

    _setActiveTab(tab) {
      this.setState({
        activeTab: tab,
      });
    }

    _renderActiveTab() {
      const {film} = this.props;
      const {activeTab} = this.state;

      switch (activeTab) {
        case MovieNavList.OVERVIEW:
          return (
            <MovieNavOverview
              rating={film.rating}
              votes={film.votes}
              description={film.description}
              director={film.director}
              starring={film.starring}
            />
          );
        case MovieNavList.DETAILS:
          return (
            <MovieNavDetails
              director={film.director}
              starring={film.starring}
              time={film.time}
              genre={film.genre}
              year={film.year}
            />
          );
        case MovieNavList.REVIEWS:
          return (
            <MovieNavReviews
              reviews={film.reviews}
            />
          );
        default: return ``;
      }
    }

    render() {
      const {activeTab} = this.state;

      return <Component
        {...this.props}
        activeTab={activeTab}
        onTabClick={this._setActiveTab}
        renderActiveTab={this._renderActiveTab}
      />;
    }
  }

  WithActiveTab.propTypes = {
    film: CustomPropTypes.FILM,
  };

  return WithActiveTab;
};

export default withActiveTab;
