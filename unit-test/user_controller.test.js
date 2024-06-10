const request = require("supertest");
const app = require("../app.js");
const SECRET_KEY = "secret";




const request_user_register = {
  name: "Admin",
  email: "admin2@email.com",
  password: "admin",
};
let user_id = 0;

describe("POST /users/register", () => {
  test("should register a user", async () => {
    return request(app)
      .post("/users/register")
      .send(request_user_register)
      .expect(200)
      .then(({ body }) => {
        user_id = body.id;
      });
  });
});

describe("GET /users/:id", () => {
  test("should return one user", async () => {
    return request(app)
      .get(`/users/${user_id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

const request_user_login = {
  email: "admin@email.com",
  password: "admin",
};
let token = " ";

describe("POST /users/login", () => {
  test("User must have account", async () => {
    return request(app)
      .post("/users/login")
      .send(request_user_login)
      .expect(200)
      .then(({ body }) => {
        token = body.token;
      });
  });
});

describe("GET /users/get", () => {
  test("should return 200 OK with valid bearer token", async () => {
    const new_token = token;
    const response = await request(app)
      .get("/users/get")
      .set("Authorization", `Bearer ${new_token}`);

    expect(response.status).toBe(200);
  });
});

describe("PATCH /users/:id", () => {
  test("should update user data", async () => {
    const request_user_update = {
      email: "hallo@email.com",
      password: "admin",
      name: "update",
    };

    const response = await request(app)
      .patch(`/users/${user_id}`)
      .send(request_user_update);

    expect(response.status).toBe(200);
  });
});

describe("DELETE /users/:id", () => {
  test("should soft delete user data", async () => {
    return request(app)
      .delete(`/users/${user_id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
