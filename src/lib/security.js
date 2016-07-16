import $config from './config';
import crypto from 'crypto';

export default {
  md5,
  sha1
};

const salt = $config().security.secret;

function md5(str) {
  return crypto
    .createHash('md5')
    .update(`${salt}${str.toString()}`)
    .digest('hex');
}

function sha1(str) {
  return crypto
    .createHash('sha1')
    .update(`${salt}${str.toString()}`)
    .digest('hex');
}
