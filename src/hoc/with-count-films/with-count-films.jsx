import React, {PureComponent} from 'react';
import {COUNT_OF_SHOW_FILMS} from '../../const.js';

const withCountFilms = (Component) => {
  class WithCountFilms extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        numberOfFilms: COUNT_OF_SHOW_FILMS,
      };

      this._handleCountShowFilmReset = this._handleCountShowFilmReset.bind(this);
      this._handleCountShowFilmAdd = this._handleCountShowFilmAdd.bind(this);
    }

    _handleCountShowFilmReset() {
      this.setState({
        numberOfFilms: COUNT_OF_SHOW_FILMS,
      });
    }

    _handleCountShowFilmAdd() {
      const currentShow = this.state.numberOfFilms;
      this.setState({
        numberOfFilms: currentShow + COUNT_OF_SHOW_FILMS,
      });
    }

    render() {
      const {numberOfFilms} = this.state;

      return <Component
        {...this.props}
        numberOfFilms={numberOfFilms}
        onCountShowFilmReset={this._handleCountShowFilmReset}
        onCountShowFilmAdd={this._handleCountShowFilmAdd}
      />;
    }
  }

  return WithCountFilms;
};

export default withCountFilms;
