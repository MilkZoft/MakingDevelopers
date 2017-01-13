// NPM Dependencies
import 'jsdom-global/register';
import React from 'react';
import { assert } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

// Redux
import { Provider } from 'react-redux';
import configureStore from '../src/frontend/configureStore';

// Utils
import { loadComponent } from '../src/lib/utils/frontend';

const initialState = loadFixture('frontend/initialState.json');

// Global methods
global.assert = assert;
global.loadComponent = loadComponent;
global.loadFixture = loadFixture;
global.mount = mount;
global.setup = setup;
global.setupRedux = setupRedux;
global.shallow = shallow;
global.sinon = sinon;
global.exists = exists;
global.equals = equals;

function loadFixture(fixture) {
  const content = require(`./fixtures/${fixture}`);

  return content;
}

function setup(Component, props = {}) {
  return shallow(<Component {...props} />);
}

function setupRedux(Component, props = {}) {
  const store = configureStore({
    initialState: initialState
  });

  return mount(<Provider store={store}><Component {...props} /></Provider>);
}

function exists(element) {
  return element && element.length === 1;
}

function equals(value1, value2) {
  return value1 === value2;
}
