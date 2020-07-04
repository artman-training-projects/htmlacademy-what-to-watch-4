import React from 'react';
import PropTypes from 'prop-types';

const CatalogMore = (props) => {
  const {onShowMoreClick} = props;

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button"
        onClick={(evt) => {
          evt.preventDefault();
          onShowMoreClick();
        }}
      >Show more</button>
    </div>
  );
};

CatalogMore.propTypes = {
  onShowMoreClick: PropTypes.func.isRequired,
};

export default CatalogMore;
