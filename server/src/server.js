import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
// const keys = require('./keys');
import logger from './utils/logger.js';
import demoRoutes from '../src/routes/demoRoutes.js';

const port = 5000;
const app = express();

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
        url: process.env.BASE_URL,
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);

app.use(helmet());

app.use(express.json());

/* middleware code */

// app.use('/s', (req, res, next) => {
//   console.log(req.body);
//   console.log('in the middle');
//   next();
// });

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use('/demo', demoRoutes);

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
