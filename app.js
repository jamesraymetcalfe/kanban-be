const express = require("express");
const { getEndpoints } = require("./controllers/api-controller");
const { handleServerErrors, handleInvalidEndpoints } = require("./errors/errors");

const app = express();
app.use(express.json());

app.get('/api', getEndpoints);

app.all("/*", handleInvalidEndpoints);

app.use(handleServerErrors);

module.exports = app;
