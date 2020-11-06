async function bootstrap(dbClient) {
  const model = require('./model')
  const User = dbClient.define(model.name, model.fields);
  dbClient.models[model.name]
  console.log(User === dbClient.models[model.name])
  User.sync();
}

module.exports = bootstrap