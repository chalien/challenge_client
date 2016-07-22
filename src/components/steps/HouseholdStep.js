import React, { PropTypes } from 'react';
import validator from 'validator';
import isNumeric from 'validator/lib/isNumeric';
var { createClass } = React;

const HouseholdStep= createClass({
  propTypes: {
    'onNextHandler': React.PropTypes.func.isRequired,
    'onBackHandler': React.PropTypes.func.isRequired,
    'saveHousehold': React.PropTypes.func.isRequired,
    'household': React.PropTypes.object.isRequired
  },

  getInitialState(){
    return this.props.household;
  },

  onBackHandler(){
    this.props.onBackHandler();
  },

  onSubmitHandler(e){
    e.preventDefault();
    if(this.validNumberofBedrooms() == ''){

      this.props.saveHousehold({
        address: this.state.address,
        zip: this.state.zip,
        city: this.state.city,
        state: this.state.state,
        number_of_bedrooms: this.state.numberOfBedrooms
      }, this.state.id);
    }
  },

  handleChange(event){
    var { name, value } = event.target;
    var changedOption = {};
    changedOption[name] =  value;

    this.setState(changedOption);
  },

  validNumberofBedrooms(){
    var { numberOfBedrooms } = this.state;

    if (!numberOfBedrooms || !isNaN(numberOfBedrooms)|| isNumeric(numberOfBedrooms)) return '';
    if (!isNumeric(this.state.numberOfBedrooms)) return 'error';
  },

  render() {
    var { address, zip, city, state, numberOfBedrooms } = this.state;
    return (
      <div className="homehold-step basic-forms">
        <h3>Household</h3>

        <form onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="input" name="address" onChange={this.handleChange} id="address" placeholder="Address" className="form-control" value={address} required/>
          </div>

          <div className="form-group">
            <label htmlFor="zip">Zip Code</label>
            <input type="input" name="zip" onChange={this.handleChange}  id="zip" placeholder="Zip" className="form-control" value={zip} required/>
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="input" name="city" onChange={this.handleChange}  id="city" placeholder="City" className="form-control" value={city} required/>
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input type="input" name="state" onChange={this.handleChange}  id="state" placeholder="State" className="form-control" value={state} required/>
          </div>

          <div className={"form-group has-" + this.validNumberofBedrooms() }>
            <label htmlFor="number_of_bedrooms">Number of Bedrooms</label>
            <input type="input" name="numberOfBedrooms" onChange={this.handleChange}  id="number_of_bedrooms" placeholder="Number of Bedrooms" className="form-control" value={numberOfBedrooms} required/>
            { this.validNumberofBedrooms() == 'error' ?   <span  className="help-block">This is not a number.</span> : null }
          </div>

           <input type="submit" className="btn btn-default" value="Next" />
        </form>
      </div>
    );
  }
});

export default HouseholdStep;
