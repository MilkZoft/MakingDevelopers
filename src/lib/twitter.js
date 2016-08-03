// Local Dependencies
import { parseJson } from './utils/object';

// Configuration
import { $social } from './config';

// Global vars
const oauth = new OAuth(
  $social().twitter.requestTokenUrl,
  $social().twitter.accessTokenUrl,
  $social().twitter.consumerKey,
  $social().twitter.consumerSecret,
  $social().twitter.apiVersion,
  $social().twitter.callbackUrl,
  $social().twitter.signMethod
);

/**
 * Returns the Twitter API Url
 *
 * @param {string} url Url
 * @returns {string} Twitter API Url + Url
 */
export function api(url) {
  return `${$social().twitter.apiUrl}${url}`;
}

/**
 * Returns the Twitter Authenticate Url with oauthToken
 *
 * @param {string} oauthToken oauthToken
 * @returns {string} Twitter Authenticate Url with oauthToken
 */
export function getAuthenticateUrl(oauthToken) {
  return `${$social().twitter.authenticateUrl}?oauth_token=${oauthToken}`;
}

/**
 * Gets the OAuthRequestToken
 *
 * @param {function} callback Callback
 * @returns {function} callback Callback
 */
export function getOAuthRequestToken(callback) {
  oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
    if (!error) {
      return callback([oauthToken, oauthTokenSecret]);
    }

    return false;
  });
}

/**
 * Gets the OAuthAccessToken and retrieves the user information
 *
 * @param {string} token Token
 * @param {string} tokenSecret Token Secret
 * @param {string} oauthVerifier oauthVerifier
 * @param {function} callback Callback
 * @returns {function} callback Callback
 */
export function getOAuthAccessToken(token, tokenSecret, oauthVerifier, callback) {
  oauth.getOAuthAccessToken(
    token,
    tokenSecret,
    oauthVerifier,
    (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
      let oauthSession;
      let userSession;

      if (!error) {
        oauthSession = {
          'token': oauthAccessToken,
          'tokenSecret': oauthAccessTokenSecret
        };

        oauth.get(api('account/verify_credentials.json'), oauthAccessToken, oauthAccessTokenSecret, (error, data) => {
          data = parseJson(data);

          userSession = {
            'networkId': data.id,
            'network'  : 'twitter',
            'username' : data.screen_name,
            'avatar'   : data.profile_image_url
          };

          return callback([oauthSession, userSession]);
        });
      }
    }
  );
}
