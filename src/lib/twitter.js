import { $social } from './config';
import { OAuth } from 'oauth';

const oauth = new OAuth(
  $social().twitter.requestTokenUrl,
  $social().twitter.accessTokenUrl,
  $social().twitter.consumerKey,
  $social().twitter.consumerSecret,
  $social().twitter.apiVersion,
  $social().twitter.callbackUrl,
  $social().twitter.signMethod
);

export function api(url) {
  return `${$config().social.twitter.apiUrl}${url}`;
}

export function getAuthenticateUrl(oauthToken) {
  return `${$config().social.twitter.authenticateUrl}?oauth_token=${oauthToken}`;
}

export function getOAuthRequestToken(callback) {
  oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
    if (!error) {
      return callback([oauthToken, oauthTokenSecret]);
    }

    return false;
  });
}

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
