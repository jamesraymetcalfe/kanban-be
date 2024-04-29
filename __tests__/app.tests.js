const app = require("../app");
const request = require("supertest");
const data = require("../database/data/test-data.json");
const mongoose = require("mongoose");
const { seed } = require("../database/seed");
const { connectToDb } = require("../database/connection");

beforeEach(() => {
  return connectToDb()
    .then(() => {
      return seed(data);
    })
    .then(() => {
      console.log("test data successfully seeded");
    })
    .catch((err) => {
      throw err;
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
//       .get("/api/users/6789/projects")
//       .expect(200)
//       .then((response) => {
//         const { projects } = response.body;
//         expect(projects).toHaveLength(2);
//         projects.forEach((project) => {
//           expect(project).toEqual(
//             expect.objectContaining({
//               firebaseUserId: "6789",
//               name: expect.any(String),
//               created_at: expect.any(String),
//               lists: expect.any(Array),
//             })
//           );
//           project.lists.forEach((list) => {
//             expect(list).toEqual(
//               expect.objectContaining({
//                 name: expect.any(String),
//                 created_at: expect.any(String),
//                 tickets: expect.any(Array),
//               })
//             ),
//               list.tickets.forEach((ticket) => {
//                 expect(ticket).toEqual(
//                   expect.objectContaining({
//                     name: expect.any(String),
//                     created_at: expect.any(String),
//                   })
//                 );
//               });
//           });
//         });
//       });
//   });
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
