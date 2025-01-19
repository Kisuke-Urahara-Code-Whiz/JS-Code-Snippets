var express = require('express');
var passport = require('passport');
const router = express.Router();
var db = require('../db');
var GoogleStrategy = require('passport-google-oidc');

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'profile' ]
  }, async function verify(issuer, profile, cb) {
    try {
      // Check if user exists
      const fedResult = await db.query(
        'SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2',
        [issuer, profile.id]
      );

      if (fedResult.rows.length === 0) {
        // Create new user
        const userResult = await db.query(
          'INSERT INTO users (name) VALUES ($1) RETURNING id',
          [profile.displayName]
        );
        
        const userId = userResult.rows[0].id;
        
        // Create federated credentials
        await db.query(
          'INSERT INTO federated_credentials (user_id, provider, subject) VALUES ($1, $2, $3)',
          [userId, issuer, profile.id]
        );

        const user = {
          id: userId,
          name: profile.displayName
        };
        return cb(null, user);
      } else {
        // Get existing user
        const userResult = await db.query(
          'SELECT * FROM users WHERE id = $1',
          [fedResult.rows[0].user_id]
        );
        
        if (userResult.rows.length === 0) {
          return cb(null, false);
        }
        
        return cb(null, userResult.rows[0]);
      }
    } catch (err) {
      return cb(err);
    }
  }));

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

module.exports = router;