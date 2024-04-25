const app = require("../app");
const request = require("supertest");
const data = require("../database/data/test-data.json");
const mongoose = require("mongoose");
const { connectToDb } = require("../database/connection");
const { TestProject } = require("../mongoose-model/project.model");

beforeEach(() => {
  return connectToDb()
    .then(() => {
      return TestProject.deleteMany({});
    })
    .then(() => {
      const parsedData = JSON.parse(JSON.stringify(data));
      console.log(parsedData)
      return TestProject.insertMany(parsedData);
    })
    .then(() => {
      console.log("Test data seeded successfully!");
    })
    .catch((error) => {
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

// describe("/api/users/:user_id/projects", () => {
//   test("GET:200 sends an array of projects for the given user", () => {
//     return request(app)
//     .get("/api/users/1234/projects")
//     .expect(200)
//     .then((response) => {
//     const { projects } = response.body;
//     expect(projects).toHaveLength(2);
//     projects.forEach((project) => {
//       expect(project).toMatchObject({
//         firebaseUserId: "6789",
//         name: expect.any(String),
//         description: expect.any(String),
//         lists: expect.any(Array),
//       })
//     })
//   })
//   })
// });

describe("GET 404 - invalid endpoint", () => {
  test("GET:404 sends an appropriate status and error message when sent a non existent route", () => {
    return request(app)
      .get("/fjfjfjd")
      .expect(404)
      .then((response) => {
        const error = response.body.msg;
        expect(error).toBe("path not found");
      });
  });
});

