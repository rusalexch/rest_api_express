const { bootstrap: userModule } = require('./users/user.module');
const { authModule } = require('./auth/auth.module');

function boot(app) {
  userModule(app);
  authModule(app);
}

module.exports = boot;
