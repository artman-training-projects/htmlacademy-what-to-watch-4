import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withVideo from './with-video.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const mockComponent = () => {

  return (
    <div

    ></div>
  );
};

describe(`HOC withVideo`, () => {
  it(`Should withVideo on play`, () => {
    const ComponentWrapped = withVideo(mockComponent);

    const wrapper = mount(
        <ComponentWrapped

        />
    );

    wrapper.instance()._handleIsPlayingChange(true);
    expect(wrapper.state().isPlaying).toEqual(true);
  });

  it(`Should withVideo off play`, () => {
    const ComponentWrapped = withVideo(mockComponent);

    const wrapper = mount(
        <ComponentWrapped

        />
    );

    wrapper.setState({
      isPlaying: true,
    });

    wrapper.instance()._handleIsPlayingChange(false);
    expect(wrapper.state().isPlaying).toEqual(false);
  });
});
