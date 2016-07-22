import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Step from './Step';
import HouseholdStep from './steps/HouseholdStep';
import PersonStep from './steps/PersonStep';
import VehicleStep from './steps/VehicleStep';
import InfoStep from './steps/InfoStep';

describe('<Step/>', () => {
  it('should contain <HouseholdStep/> components', () => {
    const wrapper = shallow(<Step />);
    let householdStep = wrapper.find(HouseholdStep);
    let personStep    = wrapper.find(PersonStep);
    const vehicleStep   = wrapper.find(VehicleStep);
    const infoStep      = wrapper.find(InfoStep);

    expect(wrapper).to.be.length(1);
    expect(householdStep).to.be.length(1);
    expect(personStep).to.be.length(0);
    expect(vehicleStep).to.be.length(0);
    expect(infoStep).to.be.length(0);
  });
});
