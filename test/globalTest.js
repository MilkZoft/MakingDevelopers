// NPM Dependencies
import { assert } from 'chai';
import sinon from 'sinon';

// Global vars
global.assert = assert;
global.sinon = sinon;
global.loadFixture = loadFixture;

function loadFixture(fixture) {
  const content = require(`./fixtures/${fixture}`);

  return content;
}
