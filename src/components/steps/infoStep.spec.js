import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import InfoStep from './InfoStep';
import PeopleList from './PeopleList';
import VehicleList from './VehicleList';
import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const onNextHandler  = sinon.spy();
const onBackHandler  = sinon.spy();
const removePerson   = sinon.spy();
const removeVehicle  = sinon.spy();
const people  = [];
const vehicles = [];
const household = {};

describe('<InfoStep/>', () => {
  it('should contain PeopleList and VehicleList', () => {
    const wrapper = shallow(<InfoStep
                          removeVehicle = {removeVehicle}
                          removePerson = {removePerson}
                          household = {household}
                          people = {people}
                          vehicles = {vehicles}
                          onNextHandler = {onNextHandler}
                          onBackHandler= {onBackHandler}/>
                         );

    let peopleList = wrapper.find(PeopleList);
    let vehicleList = wrapper.find(VehicleList);

    expect(peopleList).to.be.length(1);
    expect(vehicleList).to.be.length(1);
  });
});
