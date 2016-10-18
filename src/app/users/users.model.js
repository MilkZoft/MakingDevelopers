// Helpers
import * as Users from '../../lib/model';

// Global vars
const fields = [
  'network',
  'networkId',
  'username',
  'password',
  'email',
  'avatar',
  'subscribed'
];

/**
 * Returns the user privilege (god, admin or user)
 *
 * @param {string} user Username
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function getPrivilege(user, callback) {
  const procedure = Users.getProcedure('getUserPrivilege', user, fields);

  Users.query(procedure, callback, (result, callback) => {
    const data = result && result[0].length > 0 ? result[0] : false;

    return callback(data);
  });
}

/**
 * Returns the user information
 *
 * @param {string} user Username
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function getUser(user, callback) {
  const procedure = Users.getProcedure('getUser', user, fields);

  Users.query(procedure, callback, (result, callback) => {
    const data = result && result[0].length > 0 ? result[0] : false;

    return callback(data);
  });
}

/**
 * Saves a user in the database
 *
 * @param {string} user Username
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function save(user, callback) {
  // TODO: Remove the filter and encrypt the password
  const procedure = Users.getProcedure('saveUser', user, fields, {
    password: 'encrypt'
  });

  Users.query(procedure, callback, (result, callback) => {
    return callback(result);
  });
}
