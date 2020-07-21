import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {MovieNavList} from '../../const.js';
import {films} from '../../components/data-for-test.js';
import withActiveTab from './with-active-tab.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const film = films[1];

const mockComponent = () => {

  return (
    <div

    ></div>
  );
};

describe(`HOC withActiveTab`, () => {
  const handleActiveTabChange = jest.fn();
  const handleActiveTabRender = jest.fn();

  it(`Should withActiveTab change tab to Overview and render`, () => {
    const ComponentWrapped = withActiveTab(mockComponent);

    const wrapper = mount(
        <ComponentWrapped
          film={film}
          onActiveTabChange={handleActiveTabChange}
          onActiveTabRender={handleActiveTabRender}
        />
    );

    wrapper.setState({
      activeTab: MovieNavList.DETAILS,
    });

    wrapper.props().onActiveTabChange(MovieNavList.OVERVIEW);
    wrapper.props().onActiveTabRender();
    expect(handleActiveTabChange).toHaveBeenCalledWith(MovieNavList.OVERVIEW);
    expect(handleActiveTabRender).toHaveBeenCalled();
  });

  it(`Should withActiveTab change tab to Details and render`, () => {
    const ComponentWrapped = withActiveTab(mockComponent);

    const wrapper = mount(
        <ComponentWrapped
          film={film}
          onActiveTabChange={handleActiveTabChange}
          onActiveTabRender={handleActiveTabRender}
        />
    );

    wrapper.props().onActiveTabChange(MovieNavList.DETAILS);
    wrapper.props().onActiveTabRender();
    expect(handleActiveTabChange).toHaveBeenCalledWith(MovieNavList.DETAILS);
    expect(handleActiveTabRender).toHaveBeenCalled();
  });

  it(`Should withActiveTab change tab to Reviews and render`, () => {
    const ComponentWrapped = withActiveTab(mockComponent);

    const wrapper = mount(
        <ComponentWrapped
          film={film}
          onActiveTabChange={handleActiveTabChange}
          onActiveTabRender={handleActiveTabRender}
        />
    );

    wrapper.props().onActiveTabChange(MovieNavList.REVIEWS);
    wrapper.props().onActiveTabRender(wrapper.state.activeTab);
    expect(handleActiveTabChange).toHaveBeenCalledWith(MovieNavList.REVIEWS);
    expect(handleActiveTabRender).toHaveBeenCalled();
  });
});
