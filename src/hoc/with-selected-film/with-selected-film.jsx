import React, {PureComponent} from 'react';

const withSelectedFilm = (Component) => {
  class WithSelectedFilm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        selectedFilm: null,
      };

      this._chooseFilm = this._chooseFilm.bind(this);
    }

    _chooseFilm(film) {
      this.setState({
        selectedFilm: film,
      });
    }

    render() {
      const {selectedFilm} = this.state;

      return <Component
        {...this.props}
        selectedFilm={selectedFilm}
        chooseFilm={this._chooseFilm}
      />;
    }
  }

  return WithSelectedFilm;
};

export default withSelectedFilm;
