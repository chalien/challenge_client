import React, { PropTypes } from 'react';
import HomeholdStep from './steps/HomeholdStep'
import PersonStep from './steps/PersonStep'
import VehicleStep from './steps/VehicleStep'

var { createClass } = React;
const wizardState = {
  'homehold': { back: 'homehold', next: 'person' },
  'person': { back: 'homehold', next: 'vehicle' },
  'vehicle': { back: 'person', next: 'vehicle' },
};

const Step = createClass({

  getInitialState(){
    return {
      currentStep: 'homehold'
    };
  },

  onNextHandler() {
    var { currentStep } = this.state;
    this.setState({ currentStep: wizardState[currentStep].next });
  },

  onBackHandler() {
    var { currentStep } = this.state;
    this.setState({ currentStep: wizardState[currentStep].back });
  },

  render() {
    var { currentStep } = this.state;
    return (
      <div className="step">
        { currentStep == 'homehold' ? <HomeholdStep onNextHandler = { this.onNextHandler} onBackHandler= { this.onBackHandler }></HomeholdStep> : null }
        { currentStep == 'person' ?  <PersonStep onNextHandler = { this.onNextHandler} onBackHandler= { this.onBackHandler }></PersonStep> : null }
        { currentStep == 'vehicle' ?  <VehicleStep onNextHandler = { this.onNextHandler} onBackHandler= { this.onBackHandler }></VehicleStep> : null }
      </div>
    );
  }
});


export default Step;

