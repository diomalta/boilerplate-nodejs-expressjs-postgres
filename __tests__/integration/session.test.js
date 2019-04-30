const request = require("supertest");

const app = require("../../src/app");
const factory = require("../utils/factories");
const truncate = require("../utils/truncate");

describe("Auth > AuthController.js", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app)
      .post("/api/signin")
      .send({
        email: user.email,
        password: "123123"
      });

    expect(response.status).toBe(201);
  });

  it("should not authenticate with invalid credentials", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app)
      .post("/api/signin")
      .send({
        email: user.email,
        password: "123456"
      });

    expect(response.status).toBe(401);
  });

  it("user not found", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app)
      .post("/api/signin")
      .send({
        email: "notexist@nothing.com",
        password: "123456"
      });

    expect(response.status).toBe(400);
  });

  it("should return jwt token when authenticated", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app)
      .post("/api/signin")
      .send({
        email: user.email,
        password: "123123"
      });

    expect(response.body).toHaveProperty("token");
  });
});
