import React, { PropTypes } from 'react';
import PeopleList from './Peoplelist'
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
var { createClass } = React;

const PersonStep = createClass({
  propTypes: {
    'onNextHandler': React.PropTypes.func.isRequired,
    'onBackHandler': React.PropTypes.func.isRequired,
    'savePerson': React.PropTypes.func.isRequired,
    'people': React.PropTypes.array.isRequired
  },

  getInitialState(){
    return {
      age: '',
      lastName: '',
      firstName: '',
      gender: 'F',
      email: '',
      people: this.props.people
    };
  },

  onSubmitHandler(e){
    e.preventDefault();
    if (!this.isValid()) return null;
    var { people, lastName, firstName, ...attributes} = this.state;
    this.props.savePerson(Object.assign({}, attributes, {
      last_name: lastName,
      first_name: firstName
    }));
  },

  isValid(){
    return (this.validNumberOfAge() == '' && this.validNumberOfAge() == '');
  },

  onBackHandler(){
    this.props.onBackHandler();
  },

  handleChange(event){
    var { name, value } = event.target;
    var changedOption = {};
    changedOption[name] =  value;

    this.setState(changedOption);
  },

  genderChange(event) {
    var value = event.target.value;
    this.setState({gender: value});
  },

  validNumberOfAge(){
    var { age } = this.state;

    if (!age|| !isNaN(age)|| isNumeric(age)) return '';
    if (!isNumeric(age)) return 'error';
  },

  validEmail(){
    var { email } = this.state;

    if (!email|| !isNaN(email)|| isEmail(email)) return '';
    if (!isEmail(email)) return 'error';
  },

  render(){
    return (
      <div className="person-step">
        <h3>Add Person to Homehold</h3>

        <form onSubmit={this.onSubmitHandler} className="form-inline">

          <div className="form-group padding-bottom-8">
            <div className="form-group">
              <label htmlFor="firstName" className="padding-both-8">First Name</label>
              <input type="input" onChange={this.handleChange} name="firstName" id="firstName" placeholder="First name" className="form-control" required/>
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="padding-both-8">Last Name</label>
              <input type="input" onChange={this.handleChange} name="lastName" id="lastName" placeholder="Last Name" className="form-control" required/>
            </div>

            <div className={ "form-group has-" + this.validEmail() }>
              <label htmlFor="email" className="padding-both-8">Email</label>
              <input type="input" onChange={this.handleChange} name="email" id="email" placeholder="Email" className="form-control" required/>
              { this.validEmail() == 'error' ?   <span  className="help-block">This is not a valid email.</span> : null }
            </div>
          </div>

          <div className= { "form-group has-" + this.validNumberOfAge() }>
            <label htmlFor="age" className="padding-both-8">Age</label>
            <input type="input" onChange={this.handleChange} name="age" id="age" placeholder="Age" className="form-control" required/>
            { this.validNumberOfAge() == 'error' ?   <span  className="help-block">This is not a number.</span> : null }
          </div>

          <div className="form-group">
            <label htmlFor="gender" className="padding-both-8">Gender</label>
            <select className="form-control" value={this.state.gender} onChange={this.genderChange} name="gender" id="gender" required>
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>
          </div>

          <div className="form-group padding-both-8">
            <button className="btn btn-default" type="submit">Add Person</button>
          </div>

          <br/>
          <PeopleList people = { this.props.people } ></PeopleList>
          <button className="btn btn-default" type="button" onClick={this.onBackHandler}>Back</button>
           <input type="button" className="btn btn-default" value="Next" />
        </form>
      </div>
    );
  }
});

export default PersonStep;

