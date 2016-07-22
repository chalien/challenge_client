import React, { PropTypes } from 'react';
import VehicleList from './Vehiclelist'
import isInt from 'validator/lib/isInt';
import RangeHelper from '../../utils/rangeHelper';
var { createClass } = React;

const VehicleStep = createClass({
  propTypes: {
    'onNextHandler': React.PropTypes.func.isRequired,
    'onBackHandler': React.PropTypes.func.isRequired,
    'saveVehicle': React.PropTypes.func.isRequired,
    'vehicles': React.PropTypes.array.isRequired,
    'people': React.PropTypes.array.isRequired
  },

  getInitialState(){
    return {
      make: '',
      model: '',
      year: '',
      licensePlate: '',
      personId: '',
      vehicles: this.props.vehicles,
      people: this.props.people
    };
  },

  onSubmitHandler(e){
    e.preventDefault();
    if (!this.isValid()) return null;
    var { licensePlate, personId, people, vehicles, ...attributes} = this.state;
    this.props.saveVehicle(Object.assign({}, attributes, {
      license_plate: licensePlate,
      person_id: personId
    }));
  },

  isValid(){
    return (this.validYear() == '');
  },

  validYear(){
    var { year } = this.state;

    if (!year|| !isNaN(year)|| isInt(year, { min: 1900, max: this.getCurrentDate().getFullYear() })) return '';
    if (!isNumeric(year)) return 'error';
  },

  getCurrentDate(){
   return new Date();
  },

  handleChange(event){
    var { name, value } = event.target;
    var changedOption = {};
    changedOption[name] =  value;

    this.setState(changedOption);
  },

  personChange(event) {
    var value = event.target.value;
    this.setState({personId: value});
  },

  yearChange(event) {
    var value = event.target.value;
    this.setState({year: value});
  },

  onNextHandler(){
    this.props.onNextHandler();
  },

  onBackHandler(){
    this.props.onBackHandler();
  },


  render(){
    return (
      <div className="person-step">
        <h3>Add Vehicule to Person</h3>

        <form onSubmit={this.onSubmitHandler} className="form-inline">

          <div className="form-group padding-bottom-8">
            <div className="form-group">
              <label htmlFor="make" className="padding-both-8">Make</label>
              <input type="input" name="make" id="make" placeholder="Make" className="form-control" onChange= {  this.handleChange }  required/>
            </div>

            <div className="form-group">
              <label htmlFor="model" className="padding-both-8">Model</label>
              <input type="input" name="model" id="model" placeholder="Model" className="form-control" onChange= {  this.handleChange }  required/>
            </div>

            <div className={ "form-group has-" + this.validYear() }>
              <label htmlFor="year" className="padding-both-8">Year</label>
              <select className="form-control" name="year" id="year" value={this.state.year} onChange = { this.yearChange} required>
                <option value=""> Select Year</option>
                {
                  RangeHelper(1900, this.getCurrentDate().getFullYear() ).map(function(year){
                    return (<option key={year} value={year}>{year}</option>);
                  })
                }
              </select>
              { this.validYear() == 'error' ?   <span  className="help-block">This is not a valid year.</span> : null }
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="licensePlate" className="padding-both-8">License Plate</label>
            <input type="input" name="licensePlate" id="licensePlate" placeholder="licensePlate" className="form-control" onChange= {  this.handleChange }  required/>
          </div>

          <div className="form-group">
            <label htmlFor="gender" className="padding-both-8">Person</label>
            <select className="form-control" name="personId" id="personId" value={this.state.personId} onChange = { this.personChange } required>
              <option value=""> Select Person </option>
              {
                this.props.people.map(function(person){
                  return (<option key={person.id} value={person.id}>{person.firstName + ' ' + person.lastName}</option>);
                })
              }
            </select>
          </div>

          <div className="form-group padding-both-8">
            <button className="btn btn-default" type="submit">Add Vehicle</button>
          </div>

          <br/>
          <VehicleList vehicles={ this.props.vehicles } ></VehicleList>
          <button className="btn btn-default" type="button" onClick={this.onBackHandler}>Back</button>
          <input type="button" className="btn btn-default" onClick={this.onNextHandler}  value="Next" />
        </form>
      </div>
    );
  }
});

export default VehicleStep;
