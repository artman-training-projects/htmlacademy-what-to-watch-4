import React, {PureComponent} from 'react';

const withSelectedFilm = (Component) => {
  class WithSelectedFilm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        selectedFilm: null,
      };

      this._handleFilmSelect = this._handleFilmSelect.bind(this);
    }

    _handleFilmSelect(film) {
      this.setState({
        selectedFilm: film,
      });
    }

    render() {
      const {selectedFilm} = this.state;

      return <Component
        {...this.props}
        selectedFilm={selectedFilm}
        onFilmSelect={this._handleFilmSelect}
      />;
    }
  }

  return WithSelectedFilm;
};

export default withSelectedFilm;
