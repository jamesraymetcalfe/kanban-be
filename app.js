const express = require("express");
const { getEndpoints } = require("./controllers/api-controller");
const {
  handleServerErrors,
  handleInvalidEndpoints,
  handleCustomErrors,
  handleMongoErrors,
} = require("./errors/errors");
const {
  getProjectsByUserID,
  postProjectToUser,
} = require("./controllers/user-controller");
const {
  getProjectByID,
  patchProjectByID,
  deleteProjectByID,
} = require("./controllers/project-controller");

const app = express();
app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/users/:user_id/projects", getProjectsByUserID);

app.post("/api/users/:user_id/projects", postProjectToUser);

app.get("/api/projects/:project_id", getProjectByID);

app.patch("/api/projects/:project_id", patchProjectByID);

app.delete("/api/projects/:project_id", deleteProjectByID);

//above here

app.all("/*", handleInvalidEndpoints);

app.use(handleCustomErrors);

app.use(handleMongoErrors);

app.use(handleServerErrors);

module.exports = app;
