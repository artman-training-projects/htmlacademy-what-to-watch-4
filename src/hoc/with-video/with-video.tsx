import * as React from 'react';
import {Subtract} from 'utility-types';
import {Film} from '../../components/custom-types';

interface Props {
  film: Film;
}

interface State {
  isPlaying: boolean;
}

interface InjectedProps {
  isPlaying: boolean;
  onIsPlayingChange: () => void;
}

const withVideo = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithVideo extends React.PureComponent<T, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._handleIsPlayingChange = this._handleIsPlayingChange.bind(this);
    }

    _handleIsPlayingChange(isPlaying) {
      this.setState({
        isPlaying,
      });
    }

    render() {
      const {isPlaying} = this.state;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        onIsPlayingChange={this._handleIsPlayingChange}
      />;
    }
  }

  return WithVideo;
};

export default withVideo;
