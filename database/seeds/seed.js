const Project = require("../../mongoose-model/project.model");
const data = require("../data/development-data.json");
const { connectToDb } = require("../connection");
const { mongoose } = require("mongoose");

const seedDevData = () => {
  return connectToDb()
    .then(() => {
      console.log("Database connection established");
      return Project.deleteMany({});
    })
    .then(() => {
      const parsedData = JSON.parse(JSON.stringify(data));
      return Project.insertMany(parsedData, { collection: "projects_dev" });
    })
    .catch((error) => {
      console.log(error);
      throw error;
    })
    .finally(() => {
      mongoose.disconnect();
    });
};

seedDevData();
