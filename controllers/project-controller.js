const { selectProjectByID } = require("../models/project-model");

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
