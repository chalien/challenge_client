import React, { PropTypes } from 'react';
import VehicleList from './VehicleList';
import PeopleList from './PeopleList';

const InfoStep = (props) => {
  return (
    <div className="margin-top-14">
      <div className="panel panel-default">
        <div className="panel-body">
          <h2>Household Summary</h2>

          <h3>Information</h3>
          <dl>
            <dt>Address</dt>
            <dd>{props.household.address}</dd>

            <dt>Zip Code</dt>
            <dd>{props.household.zip}</dd>

            <dt>City</dt>
            <dd>{props.household.city}</dd>

            <dt>State</dt>
            <dd>{props.household.state}</dd>

            <dt>Number of Bedrooms</dt>
            <dd>{props.household.numberOfBedrooms}</dd>
          </dl>

          <h3>People</h3>
          <PeopleList people = { props.people } ></PeopleList>
          <h3>Vehicles</h3>
          <VehicleList vehicles = { props.vehicles } ></VehicleList>
        </div>
      </div>

      <div className="step-container">
        <button className="btn btn-default" type="button" onClick={props.onBackHandler}>Back</button>
      </div>
    </div>
  );
};

export default InfoStep;

