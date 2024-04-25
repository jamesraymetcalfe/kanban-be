const { DevProject } = require("../mongoose-model/project.model");
const data = require("./data/development-data.json");
const { connectToDb } = require("./connection");
const mongoose = require("mongoose");

const seedDevData = () => {
  return connectToDb()
    .then(() => {
      return DevProject.deleteMany({});
    })
    .then(() => {
      const parsedData = JSON.parse(JSON.stringify(data));
      console.log(parsedData)
      return DevProject.insertMany(parsedData);
    })
    .then(() => {
      console.log("Development data seeded successfully!");
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      mongoose.disconnect();
    });
};

seedDevData();
