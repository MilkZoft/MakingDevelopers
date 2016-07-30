import $config from './config';
import { OAuth } from 'oauth';

const oauth = new OAuth(
  $config().social.twitter.requestTokenUrl,
  $config().social.twitter.accessTokenUrl,
  $config().social.twitter.consumerKey,
  $config().social.twitter.consumerSecret,
  $config().social.twitter.apiVersion,
  $config().social.twitter.callbackUrl,
  $config().social.twitter.signMethod
);

export default {
  api,
  getAuthenticateUrl,
  getOAuthRequestToken,
  getOAuthAccessToken
};

function api(url) {
  return `${$config().social.twitter.apiUrl}${url}`;
}

function getAuthenticateUrl(oauthToken) {
  return `${$config().social.twitter.authenticateUrl}?oauth_token=${oauthToken}`;
}

function getOAuthRequestToken(callback) {
  oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
    if (!error) {
      return callback([oauthToken, oauthTokenSecret]);
    }

    return false;
  });
}

function getOAuthAccessToken(token, tokenSecret, oauthVerifier, callback) {
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

        oauth.get(
          api('account/verify_credentials.json'),
          oauthAccessToken,
          oauthAccessTokenSecret,

          (error, data) => {
            data = JSON.parse(data);

            userSession = {
              'networkId': data.id,
              'network'  : 'twitter',
              'username' : data.screen_name,
              'avatar'   : data.profile_image_url
            };

            return callback([oauthSession, userSession]);
          }
        );
      }
    }
  );
}
