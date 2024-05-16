const Project = require("../mongoose-model/project.model");

exports.selectProjectsByUserID = (user_id) => {
  // add in a userExists check once firebase set up
  return Project.find({ firebaseUserId: user_id }).then((projects) => {
    return projects;
  });
};

exports.insertProjectToUser = (user_id, newProject) => {
   // add in a userExists check once firebase set up
  const {name} = newProject
  const project = new Project(newProject);
  return project.save().then((project) => {
    return project;
  });
};
