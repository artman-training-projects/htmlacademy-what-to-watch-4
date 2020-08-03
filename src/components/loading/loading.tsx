import * as React from 'react';
import {css} from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';

const override = css`
  display: block;
  margin: auto;
  margin-top: 35vh;
`;

const Loading = () => {
  return (
    <div className="sweet-loading">
      <RingLoader
        css={override}
        size={150}
        color={`#123abc`}
      />
    </div>
  );
};

export default Loading;
