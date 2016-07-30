import * as Users from '../../lib/model';

const fields = [
  'network',
  'networkId',
  'username',
  'password',
  'email',
  'avatar',
  'subscribed'
];

export function getPrivilege(user, callback) {
  const procedure = Users.getProcedure('getUserPrivilege', user, fields);

  Users.query(procedure, callback, (result, callback) => {
    const data = result && result[0].length > 0 ? result[0] : false;

    callback(data);
  });
}

export function getUser(user, callback) {
  const procedure = Users.getProcedure('getUser', user, fields);

  Users.query(procedure, callback, (result, callback) => {
    const data = result && result[0].length > 0 ? result[0] : false;

    callback(data);
  });
}

export function save(user, callback) {
  const procedure = Users.getProcedure('saveUser', user, fields1, {
    password: 'encrypt'
  });

  Users.query(procedure, callback, (result, callback) => {
    callback(result);
  });
}
