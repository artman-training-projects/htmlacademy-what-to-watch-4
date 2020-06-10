import React from 'react';
import Main from '../components/main.jsx';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {moviePoster} = props;

  return (
    <Main
      {...{moviePoster}}
    />
  );
};

export default App;
