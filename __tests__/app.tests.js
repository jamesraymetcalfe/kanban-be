const app = require("../app");
const request = require("supertest");
const data = require("../database/data/test-data.json");
const mongoose = require("mongoose");
const { connectToDb } = require("../database/connection");
const Project = require("../mongoose-model/project.model");

beforeEach(() => {
  return connectToDb()
    .then(() => {
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

describe("/api", () => {
  test("GET:200 sends an object describing all the available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const { endpoints } = response.body;
        for (const endpoint in endpoints) {
          expect(endpoints[endpoint]).toMatchObject({
            description: expect.any(String),
            queries: expect.any(Array),
            exampleResponse: expect.any(Object),
          });
        }
      });
  });
});

describe("GET 404 - invalid endpoint", () => {
  test("GET:404 send an appropriate status and error message when sent a non existent route", () => {
    return request(app)
      .get("/fjfjfjd")
      .expect(404)
      .then((response) => {
        const error = response.body.msg;
        expect(error).toBe("path not found");
      });
  });
});
