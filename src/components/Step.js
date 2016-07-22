import React, { PropTypes } from 'react';
import HouseholdStep from './steps/HouseholdStep'
import PersonStep from './steps/PersonStep'
import VehicleStep from './steps/VehicleStep'
import InfoStep from './steps/InfoStep'
import HttpHelper from '../utils/httpHelper';

var { createClass } = React;
const wizardState = {
  'household': { back: 'household', next: 'person' },
  'person': { back: 'household', next: 'vehicle' },
  'vehicle': { back: 'person', next: 'info' },
  'info': { back: 'vehicle', next: 'info' },
};

const Step = createClass({

  getInitialState(){
    return {
      currentStep: 'household',
      people: [],
      vehicles: [],
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

  saveHousehold(attributes, id){
    var context = this;
    var params = { household:  attributes };
    var action = 'post';
    var url = '/households';

    if(id){
      action = 'put';
      url = '/households/' + id;
    }

    HttpHelper[action](url, params)
    .then(function(response){
      context.setState({household: response.data});
      context.onNextHandler();
    })
    .catch(function(error){
      console.warn(error);
      // console.log(error.response.data);
    });
  },

  savePerson(attributes){
    var context = this;
    var { household, people } = this.state;
    var params = { person:  attributes };

    attributes["household_id"] = household.id;

    HttpHelper.post('/people', params)
    .then(function(response){
      var t = {people: people.concat([response.data])};
      context.setState(t);
    })
    .catch(function(error){
      console.warn(error);
      // console.log(error.response.data);
    });
  },

  saveVehicle(attributes) {
    var context = this;
    var { vehicles } = this.state;
    var params = { vehicle:  attributes };

    HttpHelper.post('/people/' + attributes.person_id + '/vehicles', params)
    .then(function(response){
      response.data['personId'] = attributes.person_id;
      var result  = {vehicles: vehicles.concat([response.data])};
      context.setState(result);
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
        { currentStep == 'person' ?  <PersonStep people = { this.state.people } savePerson = { this.savePerson } onNextHandler = { this.onNextHandler} onBackHandler= { this.onBackHandler }></PersonStep> : null }
        { currentStep == 'vehicle' ?  <VehicleStep saveVehicle = { this.saveVehicle } people = { this.state.people } vehicles = { this.state.vehicles } onNextHandler = { this.onNextHandler} onBackHandler= { this.onBackHandler }></VehicleStep> : null }
        { currentStep == 'info' ?  <InfoStep household = { this.state.household }  people = { this.state.people } vehicles = { this.state.vehicles } onNextHandler = { this.onNextHandler} onBackHandler= { this.onBackHandler }></InfoStep> : null }
      </div>
    );
  }
});


export default Step;

