// Utils
import { isArray, isDefined } from './utils/is';

// Model
import * as Users from '../app/users/users.model';

export default (req, res, next) => {
  // Methods
  res.profileAllowed = profileAllowed;

  return next();

  /**
   * Returns user information if is a profileAllowed
   *
   * @param {function} callback Callback
   * @returns {callback} Callback or redirects if the user is not allowed
   */
  function profileAllowed(callback) {
    const connectedUser = res.session('user');

    if (isDefined(connectedUser) && isDefined(res.session('oauth'))) {
      Users.getPrivilege({
        network: connectedUser.network,
        networkId: connectedUser.networkId,
        username: connectedUser.username,
        password: false
      }, (userInfo) => {
        const privilege = isArray(userInfo) ? userInfo[0].privilege : false;

        if (privilege === 'god' || privilege === 'admin') {
          return callback(connectedUser);
        } else {
          return res.redirect('/');
        }
      });
    } else {
      return res.redirect('/');
    }
  }
};
