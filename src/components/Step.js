import React from 'react';
import HouseholdStep from './steps/HouseholdStep';
import PersonStep from './steps/PersonStep';
import VehicleStep from './steps/VehicleStep';
import InfoStep from './steps/InfoStep';
import HttpHelper from '../utils/httpHelper';

let { createClass } = React;
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
    let { currentStep } = this.state;
    this.setState({ currentStep: wizardState[currentStep].next });
  },

  onBackHandler() {
    let { currentStep } = this.state;
    this.setState({ currentStep: wizardState[currentStep].back });
  },

  saveHousehold(attributes, id){
    let context = this;
    let params = { household:  attributes };
    let action = 'post';
    let url = '/households';

    if(id){
      action = 'put';
      url = '/households/' + id;
    }

    HttpHelper[action](url, params)
    .then(function(response){
      context.setState({household: response.data});
      context.onNextHandler();
    })
    .catch(function(){
    });
  },

  savePerson(attributes){
    let context = this;
    let { household, people } = this.state;
    let params = { person:  attributes };

    attributes["household_id"] = household.id;

    HttpHelper.post('/people', params)
    .then(function(response){
      let result = people.concat([response.data]);
      context.setState({people: result});
    })
    .catch(function(){
      // console.log(error);
    });
  },

  removePerson(id) {
    let context = this;
    let { people } = this.state;

    HttpHelper.delete('/people/' + id)
    .then(function(){
      let results = people.filter(function(person) { return person.id != id; });
      context.setState({people: results});
    })
    .catch(function(){
      // console.log(error);
    });
  },

  removeVehicle(personId, id) {
    let context = this;
    let { vehicles } = this.state;

    HttpHelper.delete('/people/' + personId + '/vehicles/' + id)
    .then(function(){
      let results = vehicles.filter(function(vehicle) { return vehicle.id != id; });
      context.setState({vehicles: results});
    })
    .catch(function(){
      // console.log(error);
    });
  },

  saveVehicle(attributes) {
    let context = this;
    let { vehicles } = this.state;
    let params = { vehicle:  attributes };

    HttpHelper.post('/people/' + attributes.person_id + '/vehicles', params)
    .then(function(response){
      response.data['personId'] = attributes.person_id;
      let result  = {vehicles: vehicles.concat([response.data])};
      context.setState(result);
    })
    .catch(function(){
      // console.log(error);
      // console.log(error.response.data);
    });
  },

  render() {
    let { currentStep } = this.state;
    return (
      <div className="step">
        {currentStep == 'household' ?
          <HouseholdStep
             household = {this.state.household}
             saveHousehold= {this.saveHousehold}
             onNextHandler = {this.onNextHandler}
             onBackHandler= {this.onBackHandler} />
        : null}

        {currentStep == 'person' ?
          <PersonStep
            people = {this.state.people}
            removePerson = {this.removePerson}
            savePerson = {this.savePerson}
            onNextHandler = {this.onNextHandler}
            onBackHandler= {this.onBackHandler}/>
          : null}

        {currentStep == 'vehicle' ?
          <VehicleStep
            removeVehicle = {this.removeVehicle}
            saveVehicle = {this.saveVehicle}
            people = {this.state.people}
            vehicles = {this.state.vehicles}
            onNextHandler = {this.onNextHandler}
            onBackHandler= {this.onBackHandler}/>
          : null}

        {currentStep == 'info' ?
          <InfoStep
            removeVehicle = {this.removeVehicle}
            removePerson = {this.removePerson}
            household = {this.state.household}
            people = {this.state.people}
            vehicles = {this.state.vehicles}
            onNextHandler = {this.onNextHandler}
            onBackHandler= {this.onBackHandler}/>
          : null}
      </div>
    );
  }
});


export default Step;

