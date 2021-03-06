const passport = require('passport');
const { userService } = require('../users/user.module');
const localStrategy = require('./strategies/local.strategy');
const jwtStrategy = require('./strategies/jwt.strategy');
const controller = require('./auth.controller');

const authModule = async (app) => {
  app.use(passport.initialize());

  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });

  // passport.deserializeUser((id, done) => {
  //   userService.findById(id)
  //     .then((user) => {
  //       done(null, user);
  //       return null;
  //     });
  // });

  passport.use('jwt', jwtStrategy(userService));
  passport.use('local', localStrategy(userService));

  app.use('/auth', controller());
};

module.exports = { authModule };
