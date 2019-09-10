const { Strategy, ExtractJwt } = require('passport-jwt');
const { model } = require('mongoose');
const keys = require('../keys');

const User = model('users');

// Autherization: Bearer fkwewrfwr.wtgw3gwgw3gw3gw3g
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT,
};

module.exports = new Strategy(options, async (payload, done) => {
  try {
    const candidate = await User.findById(payload.userId).select('id');

    if (candidate) {
      done(null, candidate)
    } else {
      done(null, false)
    }
  } catch (e) {
    console.error(e)
  }
});
