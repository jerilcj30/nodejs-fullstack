require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
// const keys = require('./keys');

const logger = require('./utils/logger');

const port = 5000;
const app = express();
app.use(helmet());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tracker API',
      version: '1.0.0',
      description: 'Application API',
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost',
      },
    ],
  },
  apis: ['./routes/*.js'], // routes refer to the routes folder
};

const specs = swaggerJsDoc(options);

app.use(express.json());

/* middleware code */

// app.use('/s', (req, res, next) => {
//   console.log(req.body);
//   console.log('in the middle');
//   next();
// });

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use('/demo', require('../src/routes/demoRoutes'));

// Capture 404 erors
app.use((req, res) => {
  res.status(404).send('PAGE NOT FOUND');
  logger.error(
    `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );
});

// Run the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  logger.info(`Server started and running on ${port}`);
});
