import * as React from 'react';
import {connect} from 'react-redux';
import {Subtract} from 'utility-types';
import {Film} from '../../components/custom-types';

import {MovieNavList} from '../../const';
import {getFilmById} from '../../reducer/data/selectors';
import MovieNavOverview from '../../components/movie-nav-overview/movie-nav-overview';
import MovieNavDetails from '../../components/movie-nav-details/movie-nav-details';
import MovieNavReviews from '../../components/movie-nav-reviews/movie-nav-reviews';

interface Props {
  selectedFilm?: Film;
}

interface State {
  activeTab: string;
}

interface InjectedProps {
  activeTab: string;
  onActiveTabChange: () => void;
  onActiveTabRender: () => void;
}

const withActiveTab = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithActiveTab extends React.PureComponent<T, State> {
    constructor(props: Props) {
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

  const mapStateToProps = (state, props) => ({
    selectedFilm: getFilmById(state, props.selectedID),
  });

  return connect(mapStateToProps)(WithActiveTab);
};

export default withActiveTab;
