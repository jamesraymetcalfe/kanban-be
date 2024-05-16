const {
  selectProjectByID,
  updateProjectByID,
} = require("../models/project-model");

exports.getProjectByID = (request, response, next) => {
  const { project_id } = request.params;
  selectProjectByID(project_id)
    .then((project) => {
      response.status(200).send({ project });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchProjectByID = (request, response, next) => {
  const { project_id } = request.params;
  const propertyToUpdate = request.body;
  updateProjectByID(project_id, propertyToUpdate)
    .then((project) => {
      response.status(200).send({ project });
    })
    .catch((err) => {
      next(err);
    });
};
