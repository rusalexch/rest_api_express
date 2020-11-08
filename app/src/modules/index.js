const { bootstrap: userModule } = require('./users');

function boot(app) {
  userModule(app);
}

module.exports = boot;
