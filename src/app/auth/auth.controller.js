import express from 'express';
import twitter from '../../lib/twitter';

const router = express.Router();

/**
 * Redirects to twitter to do the login
 */
router.get('/twitter', (req, res) => {
  twitter.getOAuthRequestToken((tokens) => {
    const oauthSession = {
      'token': tokens[0],
      'tokenSecret': tokens[1]
    };

    res.session('oauth', oauthSession);
    res.redirect(twitter.getAuthenticateUrl(tokens[0]));
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

    twitter.getOAuthAccessToken(data.token, data.tokenSecret, oauthVerifier, sessions => {
      res.session('oauth', sessions[0]);
      res.session('user', sessions[1]);

      res.redirect(`${res.locals.basePath}/users/validation`);
    });
  }
});

export default router;
