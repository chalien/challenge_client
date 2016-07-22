import React, { PropTypes } from 'react';
import PeopleList from './Peoplelist'
var { createClass } = React;

const PersonStep = createClass({
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
        <h3>Add Person to Homehold</h3>

        <form onSubmit={this.onSubmitHandler} className="form-inline">

          <div className="form-group padding-bottom-8">
            <div className="form-group">
              <label htmlFor="firstName" className="padding-both-8">First Name</label>
              <input type="input" name="firstName" id="firstName" placeholder="First name" className="form-control"/>
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="padding-both-8">Last Name</label>
              <input type="input" name="lastName" id="lastName" placeholder="Last Name" className="form-control"/>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="padding-both-8">Email</label>
              <input type="input" name="email" id="email" placeholder="Email" className="form-control"/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="age" className="padding-both-8">Age</label>
            <input type="input" name="age" id="age" placeholder="Age" className="form-control"/>
          </div>

          <div className="form-group">
            <label htmlFor="gender" className="padding-both-8">Gender</label>
            <select className="form-control" value="M" name="gender" id="gender" onChange={ function() {} }>
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>
          </div>

          <div className="form-group padding-both-8">
            <button className="btn btn-default" type="button">Add Person</button>
          </div>

          <br/>
          <PeopleList></PeopleList>
          <button className="btn btn-default" type="button" onClick={this.onBackHandler}>Back</button>
           <input type="submit" className="btn btn-default" value="Next" />
        </form>
      </div>
    );
  }
});

export default PersonStep;

