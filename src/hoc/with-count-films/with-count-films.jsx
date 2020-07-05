import React, {PureComponent} from 'react';
import {COUNT_OF_SHOW_FILMS} from '../../const.js';

const withCountFilms = (Component) => {
  class WithCountFilms extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        numberOfFilms: COUNT_OF_SHOW_FILMS,
      };

      this._resetCountShow = this._resetCountShow.bind(this);
      this._addCountShow = this._addCountShow.bind(this);
    }

    _resetCountShow() {
      this.setState({
        numberOfFilms: COUNT_OF_SHOW_FILMS,
      });
    }

    _addCountShow() {
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
        resetCountShow={this._resetCountShow}
        addCountShow={this._addCountShow}
      />;
    }
  }

  return WithCountFilms;
};

export default withCountFilms;
