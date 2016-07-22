import React from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import PersonStep  from './PersonStep';
import PeopleList from './PeopleList';
import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const onNextHandler = sinon.spy();
const onBackHandler = sinon.spy();
const savePerson= sinon.spy();
const removePerson= sinon.spy();
const people = [];

describe('<VehicleStep/>', () => {
  it('should call when submit form', () => {
    const wrapper = mount(<PersonStep
                          people = {people}
                          removePerson = {removePerson}
                          savePerson = {savePerson}
                          onNextHandler = {onNextHandler}
                          onBackHandler= {onBackHandler}/>
                         );

    wrapper.find('form').simulate('submit');
    expect(savePerson).to.have.property('callCount', 1);
  });

  it('should be compose with a vehicleList', () => {
    const wrapper = shallow(<PersonStep
                          people = {people}
                          removePerson = {removePerson}
                          savePerson = {savePerson}
                          onNextHandler = {onNextHandler}
                          onBackHandler= {onBackHandler}/>
                         );


    let peopleList = wrapper.find(PeopleList);
    expect(peopleList).to.be.length(1);
  });
});
