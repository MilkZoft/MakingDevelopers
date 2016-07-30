import { $security } from './../config';
import { isDefined } from './is';
import crypto from 'crypto';

const salt = $security().secret;

export function encrypt(str) {
  return sha1(md5(str));
}

export function md5(str) {
  if (isDefined(str)) {
    return crypto
      .createHash('md5')
      .update(`${salt}${str.toString()}`)
      .digest('hex');
  }

  return false;
}

export function sha1(str) {
  if (isDefined(str)) {
    return crypto
      .createHash('sha1')
      .update(`${salt}${str.toString()}`)
      .digest('hex');
  }

  return false;
}
