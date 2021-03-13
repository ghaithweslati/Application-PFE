const request = require("supertest");
const app = require("../app");

// Setting the enviroment to test so the app server in app.js file dosen't listen
beforeAll(() => {
  process.env.NODE_ENV = "test";
});

//
describe("Testing the '/auth/signup' route", () => {
  // If you don't clean the DB each time you open this test case it will fail.
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

  test("Post - SignUp : Email already exists", async function (done) {
    // duplicating the last test to make this test logical
    // it should refuse singning up the user since the email is already used by the last test case

    const results = await request(app).post("/auth/signup").send({
      email: "success@gmail.com",
      name: "Omar Mach",
      password: "StrongPassword19",
    });

    expect(results.body.errors[0].msg).toBeTruthy();
    done();
  });

  test("Post - SignUp : Wrong email format", async function (done) {
    const results = await request(app).post("/auth/signup").send({
      email: "wrongEmail.com",
      name: "Omar Mach",
      password: "StrongPassword19",
    });

    expect(results.body.errors[0].msg).toBeTruthy();
    done();
  });

  test("Post - SignUp : Weak password", async function (done) {
    const results = await request(app).post("/auth/signup").send({
      email: "weakPassword@test.it",
      name: "Omar Mach",
      password: "123",
    });

    expect(results.body.errors[0].msg).toBeTruthy();
    done();
  });

  test("Post - SignUp : Empty password string", async function (done) {
    const results = await request(app).post("/auth/signup").send({
      email: "emptyPassword@test.it",
      name: "Omar Mach",
      password: "",
    });

    expect(results.body.errors).toBeTruthy();
    done();
  });

  test("Post - SignUp : Empty name string", async function (done) {
    const results = await request(app).post("/auth/signup").send({
      email: "empty@test.it",
      name: "",
      password: "123",
    });

    expect(results.body.errors[0].msg).toBeTruthy();
    done();
  });

  test("Post - SignUp : Without name in body ", async function (done) {
    const results = await request(app).post("/auth/signup").send({
      email: "withoutName@test.it",
      password: "StrongPassword19",
    });

    expect(results.body.errors[0].msg).toBeTruthy();
    done();
  });

  test("Post - SignUp : Without password  in body", async function (done) {
    const results = await request(app).post("/auth/signup").send({
      email: "withoutName@test.it",
      name: "Without Name",
    });

    expect(results.body.errors[0].msg).toBeTruthy();
    done();
  });

  test("Post - SignUp : Without name and password  in body", async function (done) {
    const results = await request(app).post("/auth/signup").send({
      email: "omar@gmail.com",
    });

    expect(results.body.errors[0].msg).toBeTruthy();
    expect(results.body.errors[0].msg).toBeTruthy();

    done();
  });

  test("Post - SignUp : Without Email, name  password ", async function (done) {
    const results = await request(app).post("/auth/signup").send({});

    expect(results.body.errors).toBeTruthy();
    done();
  });
});

describe("Testing the auth/login route", () => {
  test("Post - Login : Best case scenario ", async function (done) {
    const email = "success@gmail.com";
    const password = "StrongPassword19";

    const results = await request(app).post("/auth/login").send({
      email,
      password,
    });

    expect(results.body.success).toBe(true);

    // just some more tests to make sure the app dosent crash
    expect(results.body.token).toBeTruthy(); // making sure that the token isn't null or undefined
    expect(results.body.user.email).toBe(email);
    done();
  });

  test("Post - Login : Wrong password ", async function (done) {
    const email = "success@gmail.com";
    const password = "WrongPassword";

    const results = await request(app).post("/auth/login").send({
      email,
      password,
    });

    expect(results.body.success).toBe(false);
    done();
  });

  test("Post - Login : No password sent ", async function (done) {
    const email = "success@gmail.com";
    const results = await request(app).post("/auth/login").send({
      email,
    });

    // since the response's body dosen't contain any 'success' field
    // we test if it is undefiend
    expect(results.body.success).toBeFalsy();
    done();
  });
});
