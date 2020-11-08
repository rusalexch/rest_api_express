const passport = require('passport');

const localGuard = passport.authenticate('local');
const jwtGuard = passport.authenticate('jwt');

module.exports = { localGuard, jwtGuard };
