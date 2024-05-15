const Project = require("../mongoose-model/project.model");

exports.selectProjectByID = (project_id) => {
  return Project.findById(project_id).then((project) => {
    if (project === null) {
      return Promise.reject({ status: 404, msg: "project does not exist" });
    }
    return project;
  });
};
