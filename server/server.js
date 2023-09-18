const keys = require("./keys");
const express = require("express");
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs')
const swaggerJSDocs = YAML.load("./api.yaml");
const logger = require('./utils/logger');

const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs))

app.use("/demo", require("./routes/demoRoutes"));

// Capture 404 erors
app.use((req, res, next) => {
  res.status(404).send("PAGE NOT FOUND");
  logger.error(
    `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
});


// Run the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  logger.info(`Server started and running on ${port}`);
});
