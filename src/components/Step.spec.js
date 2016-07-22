import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
// import sinon from 'sinon';
import Step from './Step';
import HouseholdStep from './steps/HouseholdStep';
import PersonStep from './steps/PersonStep';
import VehicleStep from './steps/VehicleStep';
import InfoStep from './steps/InfoStep';

describe('<Step/>', () => {
  it('should contain <HouseholdStep/> components', () => {
    const wrapper = shallow(<Step />);
    const householdStep = wrapper.find(HouseholdStep);
    const personStep    = wrapper.find(PersonStep);
    const vehicleStep   = wrapper.find(VehicleStep);
    const infoStep      = wrapper.find(InfoStep);

    expect(wrapper).to.be.length(1);
    // expect(allInputs.at(0).props().name).to.equal('newMpg');
    // expect(allInputs.at(0).props().value).to.equal(fuelSavings.newMpg);
    // expect(allInputs.at(1).props().name).to.equal('tradeMpg');
    // expect(allInputs.at(1).props().value).to.equal(fuelSavings.tradeMpg);
    // expect(allInputs.at(2).props().name).to.equal('newPpg');
  });
});
