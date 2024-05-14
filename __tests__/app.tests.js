const app = require("../app");
const request = require("supertest");
const data = require("../database/data/test-data.json");
const mongoose = require("mongoose");
const { seed } = require("../database/seed");
const { connectToDb } = require("../database/connection");
const Project = require("../mongoose-model/project.model");

beforeAll(() => {
  return connectToDb().catch((err) => {
    throw err;
  });
});

beforeEach(() => {
  return seed(data).catch((err) => {
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

describe("/api/users/:user_id/projects", () => {
  test("GET:200 sends an array of projects for the given user", () => {
    return request(app)
      .get("/api/users/6789/projects")
      .expect(200)
      .then((response) => {
        const { projects } = response.body;
        expect(projects).toHaveLength(2);
        projects.forEach((project) => {
          expect(project).toEqual(
            expect.objectContaining({
              firebaseUserId: 6789,
              name: expect.any(String),
              created_at: expect.any(String),
              lists: expect.any(Array),
            })
          );
          project.lists.forEach((list) => {
            expect(list).toEqual(
              expect.objectContaining({
                name: expect.any(String),
                created_at: expect.any(String),
                tickets: expect.any(Array),
              })
            ),
              list.tickets.forEach((ticket) => {
                expect(ticket).toEqual(
                  expect.objectContaining({
                    name: expect.any(String),
                    created_at: expect.any(String),
                  })
                );
              });
          });
        });
      });
  });
  test("GET 200: sends an empty array when no projects have been created at valid article_id", () => {
    return request(app)
      .get("/api/users/0001/projects")
      .expect(200)
      .then((response) => {
        const { projects } = response.body;
        expect(projects).toHaveLength(0);
        expect(Array.isArray(projects)).toBe(true);
      });
  });
  test.skip("GET:404 sends an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/users/9999/projects")
      .expect(404)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("article does not exist");
      });
  });
  test("GET:400 sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/users/forklift/projects")
      .expect(400)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("bad request");
      });
  });
});

describe("/api/projects/:project_id", () => {
  test("GET:200 serves up a single project with the correct id", () => {
    return Project.findOne()
      .then((data) => {
        const id = data._id.toString();
        return id;
      })
      .then((id) => {
        return request(app)
          .get(`/api/projects/${id}`)
          .expect(200)
          .then((response) => {
            const { project } = response.body;
            expect(project._id).toBe(id);
          });
      });
  });
  test("GET:404 sends an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/projects/55153a8014829a865bbf700d")
      .expect(404)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("article does not exist");
      });
  });
  test.only("GET:400 sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/projects/forklift")
      .expect(400)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("bad request");
      });
  });
});

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
