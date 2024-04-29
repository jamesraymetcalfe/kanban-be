const Project = require("../mongoose-model/project.model");
const mongoose = require("mongoose");

exports.seed = (data) => {
  return Project.deleteMany({})
    .then(() => {
      const parsedData = JSON.parse(JSON.stringify(data));
      return Project.insertMany(parsedData);
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => {
      mongoose.disconnect();
    });
};
