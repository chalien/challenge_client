import React, { PropTypes } from 'react';
// var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var { createClass } = React;

// new JSONAPIDeserializer().deserialize(test, (err, users) => {
//   console.warn(users[0].address);
// });

const HomeholdStep= createClass({
  propTypes: {
    'onNextHandler': React.PropTypes.func.isRequired,
    'onBackHandler': React.PropTypes.func.isRequired
  },

  onBackHandler(){
    this.props.onBackHandler();
  },

  onSubmitHandler(e){
    e.preventDefault();
    this.props.onNextHandler();
  },

  render() {
    return (
      <div className="homehold-step basic-forms">
        <h3>Household</h3>

        <form onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="input" name="address" id="address" placeholder="Address" className="form-control"/>
          </div>

          <div className="form-group">
            <label htmlFor="zip">Zip Code</label>
            <input type="input" name="zip" id="zip" placeholder="Zip" className="form-control"/>
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="input" name="city" id="city" placeholder="City" className="form-control"/>
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input type="input" name="state" id="state" placeholder="State" className="form-control"/>
          </div>

          <div className="form-group">
            <label htmlFor="number_of_bedrooms">Number of Bedrooms</label>
            <input type="input" name="number_of_bedrooms" id="number_of_bedrooms" placeholder="Number of Bedrooms" className="form-control"/>
          </div>

           <input type="submit" className="btn btn-default" value="Next" />
        </form>
      </div>
    );
  }
});

export default HomeholdStep;

