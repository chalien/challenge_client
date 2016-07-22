import React, { PropTypes } from 'react';
import HouseholdStep from './steps/HouseholdStep'
import PersonStep from './steps/PersonStep'
import VehicleStep from './steps/VehicleStep'
import HttpHelper from '../utils/httpHelper';

var { createClass } = React;
const wizardState = {
  'household': { back: 'household', next: 'person' },
  'person': { back: 'household', next: 'vehicle' },
  'vehicle': { back: 'person', next: 'vehicle' },
};

const Step = createClass({

  getInitialState(){
    return {
      currentStep: 'household',
      household: {
        id: null,
        address:  '',
        zip: '',
        city: '',
        state: '',
        numberOfBedrooms: '',
        createdAt: '',
        updatedAt: ''
      }
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

  saveHousehold(attributes){
    var context = this;
    var params = { household:  attributes };

    HttpHelper.post('/households', params)
    .then(function(response){
      context.setState({household: response.data});
      context.onNextHandler();
    })
    .catch(function(error){
      console.warn(error);
      // console.log(error.response.data);
    });
  },

  render() {
    var { currentStep } = this.state;
    return (
      <div className="step">
        { currentStep == 'household' ? <HouseholdStep household = { this.state.household } saveHousehold= { this.saveHousehold } onNextHandler = { this.onNextHandler} onBackHandler= { this.onBackHandler }></HouseholdStep> : null }
        { currentStep == 'person' ?  <PersonStep onNextHandler = { this.onNextHandler} onBackHandler= { this.onBackHandler }></PersonStep> : null }
        { currentStep == 'vehicle' ?  <VehicleStep onNextHandler = { this.onNextHandler} onBackHandler= { this.onBackHandler }></VehicleStep> : null }
      </div>
    );
  }
});


export default Step;

