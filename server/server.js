const keys = require("./keys");
const express = require('express')
const dotenv = require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use('/demo', require('./routes/demoRoutes'))

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})