const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const jwtStrategy = (service) => new JwtStrategy(params,
  ({ sub: id }, done) => {
    service.findById(id)
      .then((user = null) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, null);
      });
  });

module.exports = jwtStrategy;
