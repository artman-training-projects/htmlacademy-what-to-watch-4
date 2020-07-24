import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {films} from '../../components/data-for-test.js';
import withComment from './with-comment.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const mockComponent = () => {

  return (
    <div

    ></div>
  );
};

const mockEvent = {
  preventDefault() {},
};

const mockEventComment = {
  target: {
    value: `text`,
  }
};

const mockEventRating = {
  target: {
    value: `5`,
  }
};

describe(`HOC withComment`, () => {
  it(`Should withComment change comment`, () => {
    const ComponentWrapped = withComment(mockComponent);
    const handleSubmitReview = jest.fn();
    const selectedFilm = films[1];

    const wrapper = mount(
        <ComponentWrapped
          film={selectedFilm}
          onSubmitReview={handleSubmitReview}
        />
    );

    wrapper.instance()._handleChangeComment(mockEventComment);
    expect(wrapper.state().comment).toEqual(mockEventComment.target.value);
  });

  it(`Should withComment change rating`, () => {
    const ComponentWrapped = withComment(mockComponent);
    const handleSubmitReview = jest.fn();
    const selectedFilm = films[1];

    const wrapper = mount(
        <ComponentWrapped
          film={selectedFilm}
          onSubmitReview={handleSubmitReview}
        />
    );

    wrapper.instance()._handleChangeRating(mockEventRating);
    expect(wrapper.state().rating).toEqual(mockEventRating.target.value);
  });

  it(`Should withComment submit`, () => {
    const ComponentWrapped = withComment(mockComponent);
    const handleSubmitReview = jest.fn();
    const selectedFilm = films[1];

    const wrapper = mount(
        <ComponentWrapped
          film={selectedFilm}
          onSubmitReview={handleSubmitReview}
        />
    );

    wrapper.setState({
      rating: mockEventRating.target.value,
      comment: mockEventComment.target.value,
    });

    wrapper.instance()._handleSubmitReview(mockEvent);
    expect(handleSubmitReview).toHaveBeenCalledWith(selectedFilm.id, {
      rating: mockEventRating.target.value,
      comment: mockEventComment.target.value,
    });
  });
});
