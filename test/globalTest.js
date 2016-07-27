import $config from '../src/lib/config';
import fs from 'fs';
import rewire from 'rewire';
import sinon from 'sinon';
import { assert } from 'chai';

global.$config = $config;
global.assert = assert;
global.sinon = sinon;