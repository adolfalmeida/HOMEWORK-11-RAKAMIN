const request = require("supertest");
const app = require("../app.js");
const token = "secret";

let todo_id = 3;

const request_todo_register = {
  title: "Testing",
  completed: true,
  user_id: 3,
};
describe("POST /todos/register", () => {
  test("should post a todo", async () => {
    return request(app)
      .post("/todos")
      .send(request_todo_register)
      .expect(201)
      .then(({ body }) => {
        todo_id = body.id;
      });
  });
});

describe("GET /todos/:id", () => {
  test("should return one todo", async () => {
    return request(app)
      .get(`/todos/${todo_id}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
});

const page = 1;
const limit = 10;
const offset = (page - 1) * limit;
const query = {
  page: page,
  limit: limit,
  offset: offset,
};
describe("GET /todos/:id", () => {
  test("should return todo by user_id", async () => {
    return request(app)
      .get(`/todos/${todo_id}`)
      .query(query)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
});

describe("PATCH /todos/:id", () => {
  test("should update todo data", async () => {
    const request_todo_update = {
      title: "Kevin 11",
      completed: true,
      user_id: 2,
    };

    const response = await request(app)
      .patch(`/todos/${todo_id}`)
      .send(request_todo_update);

    expect(response.status).toBe(200);
  });
});

describe("DELETE /todos/:id", () => {
  test("should soft delete todo data", async () => {
    return request(app)
      .delete(`/todos/${todo_id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
