import React, { PropTypes } from 'react';
import VehicleList from './Vehiclelist'
var { createClass } = React;

const VehicleStep = createClass({
  propTypes: {
    'onNextHandler': React.PropTypes.func.isRequired,
    'onBackHandler': React.PropTypes.func.isRequired
  },

  onSubmitHandler(e){
    e.preventDefault();
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
              <input type="input" name="make" id="make" placeholder="Make" className="form-control"/>
            </div>

            <div className="form-group">
              <label htmlFor="model" className="padding-both-8">Model</label>
              <input type="input" name="model" id="model" placeholder="Model" className="form-control"/>
            </div>

            <div className="form-group">
              <label htmlFor="year" className="padding-both-8">Year</label>
              <input type="input" name="year" id="year" placeholder="Year" className="form-control"/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="licensePlate" className="padding-both-8">License Plate</label>
            <input type="input" name="licensePlate" id="licensePlate" placeholder="licensePlate" className="form-control"/>
          </div>

          <div className="form-group">
            <label htmlFor="gender" className="padding-both-8">Person</label>
            <select className="form-control" name="person" id="person" onChange={ function() {} }>
            </select>
          </div>

          <div className="form-group padding-both-8">
            <button className="btn btn-default" type="button">Add Vehicle</button>
          </div>

          <br/>
          <VehicleList></VehicleList>
          <button className="btn btn-default" type="button" onClick={this.onBackHandler}>Back</button>
           <input type="submit" className="btn btn-default" value="Next" />
        </form>
      </div>
    );
  }
});

export default VehicleStep;
