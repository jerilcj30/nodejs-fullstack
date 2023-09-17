const keys = require("./keys");
const express = require("express");
const logger = require('./utils/logger');

const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/demo", require("./routes/demoRoutes"));

// Capture 500 errors
app.use((err, req, res, next) => {
  res.status(500).send("Could not perform the calculation!");
  logger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
});

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
