const app = require("../app");
const request = require("supertest");
const data = require("../database/data/test-data.json");
const mongoose = require("mongoose");

beforeEach(() => {
  return connectToDb()
    .then(() => {
      console.log("Database connection established");
      return Project.deleteMany({});
    })
    .then(() => {
      const parsedData = JSON.parse(JSON.stringify(data));
      return Project.insertMany(parsedData, { collection: "projects_test" });
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
});

afterAll(() => mongoose.disconnect());
