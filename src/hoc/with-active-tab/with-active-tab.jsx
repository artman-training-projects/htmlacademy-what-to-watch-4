import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../../components/custom-prop-types.js';

import {MovieNavList} from '../../const.js';
import {getFilmById} from '../../reducer/data/selectors.js';
import {Operations as DataOperations} from '../../reducer/data/data.js';
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
            <MovieNavReviews />
          );
        default: return ``;
      }
    }

    render() {
      const {loadComments, selectedFilm} = this.props;
      const {activeTab} = this.state;
      loadComments(selectedFilm);

      return <Component
        {...this.props}
        activeTab={activeTab}
        onActiveTabChange={this._handleActiveTabChange}
        onActiveTabRender={this._handleActiveTabRender}
      />;
    }
  }

  WithActiveTab.propTypes = {
    loadComments: PropTypes.func.isRequired,
    selectedFilm: PropTypes.oneOfType([
      CustomPropTypes.FILM,
      PropTypes.bool,
    ]),
  };

  const mapStateToProps = (state, props) => ({
    selectedFilm: getFilmById(state, props.selectedID),
  });

  const mapDispatchToProps = (dispatch) => ({
    loadComments(film) {
      dispatch(DataOperations.loadComments(film.id));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithActiveTab);
};

export default withActiveTab;
