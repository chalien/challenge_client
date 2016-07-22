import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import HouseholdStep from './HouseholdStep';
import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const onNextHandler = sinon.spy();
const onBackHandler = sinon.spy();
const saveHousehold = sinon.spy();

describe('<HouseholdStep/>', () => {
  it('should call the saveHousehold when submit form', () => {
    let household = {
      address: "12 Valley Farms Street ",
      zip: "20735",
      city: "Clinton",
      state: "Maryland",
      number_of_bedrooms: 2
    };

    const wrapper = mount(<HouseholdStep
                              household = {household}
                              saveHousehold = {saveHousehold}
                              onNextHandler = {onNextHandler}
                              onBackHandler = {onBackHandler}
                            />);

    wrapper.find('form').simulate('submit');
    expect(saveHousehold).to.have.property('callCount', 1);
    expect(onNextHandler).to.have.property('callCount', 0);
  });


  it('should validate if number_of_bedrooms is a number', () => {
    let household = {
      numberOfBedrooms: "wrong value"
    };

    const wrapper = mount(<HouseholdStep
                            household = {household}
                            saveHousehold = {saveHousehold}
                            onNextHandler = {onNextHandler}
                            onBackHandler = {onBackHandler}
                            />);

    expect(wrapper.find('form').find('.has-error')).to.be.length(1);
    expect(wrapper.find('form').find('.help-block')).to.be.length(1);
  });
});
