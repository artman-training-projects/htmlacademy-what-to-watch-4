import * as React from 'react';
import {Subtract} from 'utility-types';
import {COUNT_OF_SHOW_FILMS} from '../../const';

interface Props {
  isAuth: boolean;
}

interface State {
  numberOfFilms: number;
}

interface InjectedProps {
  numberOfFilms: number;
  onCountShowFilmAdd: () => void;
  onCountShowFilmReset: () => void;
}

const withCountFilms = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithCountFilms extends React.PureComponent<T, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        numberOfFilms: COUNT_OF_SHOW_FILMS,
      };

      this._handleCountShowFilmAdd = this._handleCountShowFilmAdd.bind(this);
      this._handleCountShowFilmReset = this._handleCountShowFilmReset.bind(this);
    }

    _handleCountShowFilmAdd() {
      const currentShow = this.state.numberOfFilms;
      this.setState({
        numberOfFilms: currentShow + COUNT_OF_SHOW_FILMS,
      });
    }

    _handleCountShowFilmReset() {
      this.setState({
        numberOfFilms: COUNT_OF_SHOW_FILMS,
      });
    }

    render() {
      const {numberOfFilms} = this.state;

      return <Component
        {...this.props}
        numberOfFilms={numberOfFilms}
        onCountShowFilmAdd={this._handleCountShowFilmAdd}
        onCountShowFilmReset={this._handleCountShowFilmReset}
      />;
    }
  }

  return WithCountFilms;
};

export default withCountFilms;
