const Project = require("../mongoose-model/project.model");

exports.selectProjectsByUserID = (user_id) => {
  return Project.find({ firebaseUserId: user_id })
    .then((projects) => {
      console.log(projects);
      return projects;
    })
    .catch((error) => {
      console.log("Error fetching projects:", error);
      throw error;
    });
};
