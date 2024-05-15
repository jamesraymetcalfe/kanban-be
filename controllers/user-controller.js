const {
  selectProjectsByUserID,
  insertProjectToUser,
} = require("../models/user-model");

exports.getProjectsByUserID = (request, response, next) => {
  const { user_id } = request.params;
  selectProjectsByUserID(user_id)
    .then((projects) => {
      response.status(200).send({ projects });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postProjectToUser = (request, response, next) => {
  const { user_id } = request.params
  const newProject = request.body;
  insertProjectToUser(user_id, newProject)
    .then((project) => {
      response.status(201).send({ project });
    })
    .catch((err) => {
      next(err);
    });
};
