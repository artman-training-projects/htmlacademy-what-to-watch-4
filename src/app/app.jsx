import React from 'react';
import Main from '../components/main.jsx';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {moviePoster, films} = props;

  return (
    <Main
      {...{moviePoster, films}}
    />
  );
};

export default App;
