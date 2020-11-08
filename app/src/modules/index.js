const { bootstrap: userModule } = require('./users/user.module');
const { bootstrap: authModule } = require('./auth/auth.module');

function boot(app) {
  authModule(app);
  userModule(app);
}

module.exports = boot;
