const Project = require("../mongoose-model/project.model");

exports.selectProjectsByUserID = (user_id) => {
  // add in a userExists check once firebase set up
  return Project.find({ firebaseUserId: user_id }).then((projects) => {
    return projects;
  });
};
