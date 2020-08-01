import * as React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../../components/custom-prop-types';

import {MovieNavList} from '../../const';
import {getFilmById} from '../../reducer/data/selectors';
import MovieNavOverview from '../../components/movie-nav-overview/movie-nav-overview';
import MovieNavDetails from '../../components/movie-nav-details/movie-nav-details';
import MovieNavReviews from '../../components/movie-nav-reviews/movie-nav-reviews';

const withActiveTab = (Component) => {
  class WithActiveTab extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: MovieNavList.OVERVIEW,
      };

      this._handleActiveTabChange = this._handleActiveTabChange.bind(this);
      this._handleActiveTabRender = this._handleActiveTabRender.bind(this);
    }

    _handleActiveTabChange(tab) {
      this.setState({
        activeTab: tab,
      });
    }

    _handleActiveTabRender() {
      const {selectedFilm} = this.props;
      const {activeTab} = this.state;

      switch (activeTab) {
        case MovieNavList.OVERVIEW:
          return (
            <MovieNavOverview
              description={selectedFilm.description}
              director={selectedFilm.director}
              rating={selectedFilm.rating}
              starring={selectedFilm.starring}
              votes={selectedFilm.votes}
            />
          );
        case MovieNavList.DETAILS:
          return (
            <MovieNavDetails
              director={selectedFilm.director}
              genre={selectedFilm.genre}
              starring={selectedFilm.starring}
              time={selectedFilm.time}
              year={selectedFilm.year}
            />
          );
        case MovieNavList.REVIEWS:
          return (
            <MovieNavReviews
              selectedFilm={selectedFilm}
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
        onActiveTabChange={this._handleActiveTabChange}
        onActiveTabRender={this._handleActiveTabRender}
      />;
    }
  }

  WithActiveTab.propTypes = {
    selectedFilm: PropTypes.oneOfType([
      CustomPropTypes.FILM,
      PropTypes.bool,
    ]),
  };

  const mapStateToProps = (state, props) => ({
    selectedFilm: getFilmById(state, props.selectedID),
  });

  return connect(mapStateToProps)(WithActiveTab);
};

export default withActiveTab;
