import React, { PropTypes } from 'react';
import Wizard from './Wizard';

const App = () => {
  return (
    <Wizard/>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
