const Project = require("../mongoose-model/project.model");

exports.selectProjectByID = (project_id) => {
  return Project.findById(project_id).then((project) => {
    if (project === null) {
      return Promise.reject({ status: 404, msg: "project does not exist" });
    }
    return project;
  });
};

exports.updateProjectByID = (project_id, propertyToUpdate) => {
  for (let key in propertyToUpdate) {
    if (
      typeof propertyToUpdate[key] !== "string" ||
      propertyToUpdate[key].length === 0
    ) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
  return Project.findByIdAndUpdate(project_id, propertyToUpdate, {
    returnDocument: "after",
  }).then((project) => {
    if (project === null) {
      return Promise.reject({ status: 404, msg: "project does not exist" });
    }
    return project;
  });
};

exports.removeProjectByID = (project_id) => {
  return Project.findByIdAndDelete(project_id).then((project) => {
    if (project === null) {
      return Promise.reject({ status: 404, msg: "project does not exist" });
    }
  });
};
