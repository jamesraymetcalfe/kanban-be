const express = require("express");
const { getEndpoints } = require("./controllers/api-controller");
const {
  handleServerErrors,
  handleInvalidEndpoints,
} = require("./errors/errors");
const { getProjectsByUserID } = require("./controllers/user-controller");

const app = express();
app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/users/:user_id/projects", getProjectsByUserID);

//above here

app.all("/*", handleInvalidEndpoints);

app.use(handleServerErrors);

module.exports = app;
