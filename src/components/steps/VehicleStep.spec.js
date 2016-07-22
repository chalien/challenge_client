import React from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import VehicleStep from './VehicleStep';
import VehicleList from './VehicleList';
import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const onNextHandler = sinon.spy();
const onBackHandler = sinon.spy();
const removeVehicle = sinon.spy();
const saveVehicle = sinon.spy();
const people = [];
const vehicles = [];

describe('<VehicleStep/>', () => {
  it('should call when submit form', () => {
    const wrapper = mount(<VehicleStep
                          removeVehicle = {removeVehicle}
                          saveVehicle = {saveVehicle}
                          people = {people}
                          vehicles = {vehicles}
                          onNextHandler = {onNextHandler}
                          onBackHandler= {onBackHandler}/>
);

    wrapper.find('form').simulate('submit');
    expect(saveVehicle).to.have.property('callCount', 1);
  });

  it('should be compose with a vehicleList', () => {
    const wrapper = shallow(<VehicleStep
                            removeVehicle = {removeVehicle}
                            saveVehicle = {saveVehicle}
                            people = {people}
                            vehicles = {vehicles}
                            onNextHandler = {onNextHandler}
                            onBackHandler= {onBackHandler}/>
                         );

    let vehicleList = wrapper.find(VehicleList);
    expect(vehicleList).to.be.length(1);
  });
});
