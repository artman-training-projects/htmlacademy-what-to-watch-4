import React, {PureComponent} from 'react';

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._setIsPlaying = this._setIsPlaying.bind(this);
    }

    _setIsPlaying(isPlaying) {
      this.setState({
        isPlaying,
      });
    }

    render() {
      const {isPlaying} = this.state;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        setIsPlaying={this._setIsPlaying}
      />;
    }
  }

  return WithVideo;
};

export default withVideo;
