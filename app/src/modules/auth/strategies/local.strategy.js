const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const params = {
  usernameField: 'email',
  passwordField: 'password',
};

const localStrategy = (service) => new LocalStrategy(params,
  ((username, password, done) => {
    service.findByEmail(username)
      .then((user = null) => {
        if (user) {
          bcrypt.compare(password, user.password)
            .then((result) => {
              if (result) {
                done(null, user);
              } else {
                done(null, null);
              }
            });
        } else {
          done(null, null);
        }
      })
      .catch((error) => {
        done(error, null);
      });
  }));

module.exports = localStrategy;
