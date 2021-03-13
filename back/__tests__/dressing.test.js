const request = require("supertest");
const app = require("../app");

// Setting the enviroment to test so the app server in app.js file dosen't listen
beforeAll(() => {
  process.env.NODE_ENV = "test";
});

describe("Testing the '/auth/signup' route", () => {
  test("Post - SignUp : Best case scenario", async function (done) {
    // sending the post request to /auth/signup route with send() params as body
    const results = await request(app).post("/auth/signup").send({
      email: "success@gmail.com",
      name: "Omar Mach",
      password: "StrongPassword19",
    });
    // checking if result's body success field is true
    expect(results.body.success).toBe(true);

    // ending the test
    done();
  });
});
