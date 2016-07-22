import React, { PropTypes } from 'react';
import Wizard from './Wizard'

const App = (props) => {
  return (
    <Wizard></Wizard>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
