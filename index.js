const express = require("express");
const database = require("./config/database");
require("dotenv").config();
const bodyParser=require('body-parser')

const routesApi = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.PORT;


database.connect();
app.use(bodyParser.json());
// Routes
routesApi(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})