import express from 'express';
import { getAuthenticateUrl, getOAuthAccessToken, getOAuthRequestToken } from '../../lib/twitter';

const router = express.Router();

/**
 * Redirects to twitter to do the login
 */
router.get('/twitter', (req, res) => {
  getOAuthRequestToken((tokens) => {
    const oauthSession = {
      'token': tokens[0],
      'tokenSecret': tokens[1]
    };

    res.session('oauth', oauthSession);
    res.redirect(getAuthenticateUrl(tokens[0]));
  });
});

/**
 * If twitter login was successful, we save oauth & user sessions
 */
router.get('/twitter/callback', (req, res) => {
  const data = res.session('oauth');
  let oauthVerifier;

  if (data) {
    oauthVerifier = req.query.oauth_verifier;

    getOAuthAccessToken(data.token, data.tokenSecret, oauthVerifier, sessions => {
      res.session('oauth', sessions[0]);
      res.session('user', sessions[1]);
      /* eslint no-console: 0 */
      console.log('>>>> AUTH INFO:', sessions);
      res.redirect(`${res.locals.basePath}/users/validation`);
    });
  }
});

export default router;
