import Users from '../app/users/users.model';
import { isDefined } from './utils/is';

export default (req, res, next) => {
  res.profileAllowed = profileAllowed;

  return next();

  function profileAllowed(callback) {
    const connectedUser = res.session('user');

    if (isDefined(connectedUser) && isDefined(res.session('oauth'))) {
      Users.getPrivilege({
        network: connectedUser.network,
        networkId: connectedUser.networkId,
        username: connectedUser.username,
        password: false
      }, (userInfo) => {
        if (userInfo) {
          return callback(userInfo[0].privilege !== 'user' ? connectedUser : false);
        }

        return res.redirect('/');
      });
    }

    return callback(false);
  }
};
