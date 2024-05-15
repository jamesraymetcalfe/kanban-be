const express = require("express");
const { getEndpoints } = require("./controllers/api-controller");
const {
  handleServerErrors,
  handleInvalidEndpoints,
  handleCustomErrors,
  handleMongoErrors,
} = require("./errors/errors");
const { getProjectsByUserID, postProjectToUser } = require("./controllers/user-controller");
const { getProjectByID } = require("./controllers/project-controller");

const app = express();
app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/users/:user_id/projects", getProjectsByUserID);

app.post("/api/users/:user_id/projects", postProjectToUser)

app.get("/api/projects/:project_id", getProjectByID);

//above here

app.all("/*", handleInvalidEndpoints);

app.use(handleCustomErrors);

app.use(handleMongoErrors);

app.use(handleServerErrors);

module.exports = app;
