import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import withVideo from './with-video';
import {films} from '../../components/data-test-set';

configure({adapter: new Adapter()});

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
          film={films[1]}
        />
    );

    wrapper.instance()._handleIsPlayingChange(true);
    expect(wrapper.state().isPlaying).toEqual(true);
  });

  it(`Should withVideo off play`, () => {
    const ComponentWrapped = withVideo(mockComponent);

    const wrapper = mount(
        <ComponentWrapped
          film={films[1]}
        />
    );

    wrapper.setState({
      isPlaying: true,
    });

    wrapper.instance()._handleIsPlayingChange(false);
    expect(wrapper.state().isPlaying).toEqual(false);
  });
});
