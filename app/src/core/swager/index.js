const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = (app) => {
  const jsDocOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Rest API',
        version: '1.0.0',
      },
    },
    apis: ['src/modules/**/*.controller.js'],
  };
  
  const swaggerSpec = swaggerJSDoc(jsDocOptions);

  const options = {
    swaggerOptions: {
      validatorUrl: null,
    },
  };

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));
};
