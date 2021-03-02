const request = require("supertest");
const app = require("../app");
require("jest");

var token;

// this function will login a user with given email and pass then returns promise
const loginUser = async (email, password) => {
  const results = await request(app).post("/auth/login").send({
    email,
    password,
  });
  return results;
};

// Setting the enviroment to test so the app server in app.js server listens to the testing port
// Logging in and retrieving token to be able to use the API
beforeAll(async (done) => {
  process.env.NODE_ENV = "test";

  const results = await loginUser("success@gmail.com", "StrongPassword19");

  // since the token in the response is sent as 'Bearer {tokenId}' we will split the string and take the id part
  if (results.body.token) token = results.body.token.split(" ")[1];

  done();
});

describe("Testing '/customer/customers' route : Token Auth", () => {
  test.only("GET - User's customers : Best case scenario", async function (done) {
    const results = await request(app)
      .get("/customer/customers")
      // setting the authorization token
      .set("Authorization", "bearer " + token);

    console.log(results.body);

    // testing the results
    // expect(results.body.message).toBe("Fetched Customers Successfully.");
    // expect(results.body.customers).toBeTruthy();
    // expect(results.body.totalItems).toBeGreaterThanOrEqual(0);

    done();
  });

  test("GET - User's customers : Without token", async function (done) {
    const results = await request(app).get("/customer/customers");

    // testing the results
    expect(results.body.message).toBeFalsy();
    expect(results.body.customers).toBeFalsy();
    expect(results.body.totalItems).toBeFalsy();

    done();
  });

  test("GET - User's customers : With wrong token (bearer)", async function (done) {
    const results = await request(app)
      .get("/customer/customers")
      // setting the authorization token
      .set("Authorization", "bearere " + token);

    // testing the results
    expect(results.body.message).toBeFalsy();
    expect(results.body.customers).toBeFalsy();
    expect(results.body.totalItems).toBeFalsy();

    done();
  });

  test("GET - User's customers : With wrong token (tokenID)", async function (done) {
    const results = await request(app)
      .get("/customer/customers")
      // setting the authorization token
      .set("Authorization", "bearer " + "This token is so wrong...");

    // testing the results
    expect(results.body.message).toBeFalsy();
    expect(results.body.customers).toBeFalsy();
    expect(results.body.totalItems).toBeFalsy();

    done();
  });

  test("GET - User's customers : From an unauthorized User", async function (done) {
    // this is an ID of a customer created by the user that we will use in this test
    // now we will try to login with an other user and try to retrieve that customer's information
    // the newly logged user shouldn't be able to do so
    const currentUserCustomerID = 1;

    // logging in with a different user
    const differentUser = await loginUser(
      "testing@jest.com",
      "StrongPassword19"
    );

    // getting that user's token
    const differentToken = differentUser.body.token.split(" ")[1];

    const results = await request(app)
      .get("/customer/customer/" + currentUserCustomerID)
      // setting the authorization token
      .set("Authorization", "bearer " + differentToken);

    // testing the results
    expect(results.body.message).toBe("No document found with that ID");
    // it's better if the response would be descriptive and send the proper status code for unauthrized actions

    done();
  });

  // TODO: Implement this test case
  // test("Get - User's customers : With expired token", async function (done) {
  //   const results = await request(app)
  //     .get("/customer/customers")
  //     // setting the authorization token
  //     .set("Authorization", "bearere " + token);

  //   // testing the results
  //   expect(results.body.message).toBeFalsy();
  //   expect(results.body.customers).toBeFalsy();
  //   expect(results.body.totalItems).toBeFalsy();

  //   done();
  // });
});

describe("Testing '/customer/customer' route : CREATE operation", () => {
  // dummy data ( best case scenario data)
  const { firstName, lastName, email, phoneNumber } = {
    firstName: "Dummy",
    lastName: "data",
    email: "dummy@test.com",
    phoneNumber: "54155569",
  };

  test("POST - Create Customer : Best case scenario", async function (done) {
    const results = await request(app)
      .post("/customer/customer")
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        firstName,
        lastName,
        email,
        phoneNumber,
      });

    // testing the results
    expect(results.body.status).toBe("success");
    expect(results.body.data).toBeTruthy();

    // verifying that the data has been correctly insterted into the database
    expect(results.body.data.firstName).toBe(firstName);
    expect(results.body.data.lastName).toBe(lastName);
    expect(results.body.data.email).toBe(email);
    expect(results.body.data.phoneNumber).toBe(phoneNumber);

    done();
  });

  test("POST - Create Customer : Wrong email format", async function (done) {
    const results = await request(app)
      .post("/customer/customer")
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        firstName,
        lastName,
        email: "thisEmailIsSoWrong",
        phoneNumber,
      });

    // testing the results
    expect(results.body.data).toBeFalsy();
    done();
  });

  test("POST - Create Customer : Wrong phone number", async function (done) {
    const results = await request(app)
      .post("/customer/customer")
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        firstName,
        lastName,
        email,
        phoneNumber: "wrongPhoneNumber",
      });

    // testing the results
    expect(results.body.data).toBeFalsy();
    done();
  });

  test("POST - Create Customer : Without email", async function (done) {
    const results = await request(app)
      .post("/customer/customer")
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        firstName,
        lastName,
        phoneNumber,
      });

    // testing the results
    expect(results.body.data).toBeFalsy();
    done();
  });

  test("POST - Create Customer : Without first name", async function (done) {
    const results = await request(app)
      .post("/customer/customer")
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        lastName,
        email,
        phoneNumber,
      });

    // testing the results
    expect(results.body.data).toBeFalsy();
    done();
  });

  test("POST - Create Customer : Without last name", async function (done) {
    const results = await request(app)
      .post("/customer/customer")
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        firstName,
        email,
        phoneNumber,
      });

    // testing the results
    expect(results.body.data).toBeFalsy();
    done();
  });

  test("POST - Create Customer : Without phone number", async function (done) {
    const results = await request(app)
      .post("/customer/customer")
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        lastName,
        email,
        firstName,
      });

    // testing the results
    expect(results.body.data).toBeFalsy();
    done();
  });

  test("POST - Create Customer : Without first name, last name and phone", async function (done) {
    const results = await request(app)
      .post("/customer/customer")
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        email,
      });

    // testing the results
    expect(results.body.data).toBeFalsy();
    done();
  });
});

// testing UPDATE opreations
describe("Testing '/customer/customer/:id' route : UPDATE operation", () => {
  // getting a valid customer ID
  const getValidCustomerID = async () => {
    const defaultUpdate = await request(app)
      .get("/customer/customers/")
      // setting the authorization token
      .set("Authorization", "bearer " + token);
    return defaultUpdate.body.customers[0].id;
  };

  beforeAll(async (done) => {
    process.env.NODE_ENV = "test";
    // this function will assign a valid ID to the update requests
    const validCustomerID = await getValidCustomerID();
    id = validCustomerID;

    done();
  });

  // dummy data ( best case scenario data)
  const { firstName, lastName, email, phoneNumber } = {
    firstName: "UPDATED",
    lastName: "dataCUSTOMER",
    email: "customer@update.com",
    phoneNumber: "123456789",
  };

  // this is a random init, it will be overrided when beforeAll is executed.
  var id = 1;

  // this function is needed to test the changed data directly from the database
  // it's usefull while updating not updating all the fields at once
  // it helps us see if the the other fields have changed or not
  const resetUpdateData = async function () {
    // reseting data to default updateTest
    const defaultUpdate = await request(app)
      .put("/customer/customer/" + id)
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        firstName,
        lastName,
        email,
        phoneNumber,
      });
  };

  test("PUT/PATCH - Update Customer : Best case scenario", async function (done) {
    // this will avoid the test crashing if

    const results = await request(app)
      .put("/customer/customer/" + id)
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        firstName,
        lastName,
        email,
        phoneNumber,
      });

    // testing the results
    expect(results.body.status).toBe("success");
    expect(results.body.data).toBeTruthy();

    // verifying that the data has been correctly insterted into the database
    expect(results.body.data.data.firstName).toBe(firstName);
    expect(results.body.data.data.lastName).toBe(lastName);
    expect(results.body.data.data.email).toBe(email);
    expect(results.body.data.data.phoneNumber).toBe(phoneNumber);

    done();
  });

  test("PUT/PATCH - Update Customer : Update only email", async function (done) {
    // reseting the data before updating one field
    await resetUpdateData();

    const results = await request(app)
      .put("/customer/customer/" + id)
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        email: "onlyEmail@test.ti",
      });

    // testing the results
    expect(results.body.status).toBe("success");
    expect(results.body.data).toBeTruthy();

    // verifying that the data has been correctly insterted into the database
    expect(results.body.data.data.firstName).toBe(firstName);
    expect(results.body.data.data.lastName).toBe(lastName);
    expect(results.body.data.data.email).toBe("onlyEmail@test.ti");
    expect(results.body.data.data.phoneNumber).toBe(phoneNumber);

    done();
  });

  test("PUT/PATCH - Update Customer : Update only firstName", async function (done) {
    // reseting the data before updating one field
    await resetUpdateData();

    const results = await request(app)
      .put("/customer/customer/" + id)
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        firstName,
      });

    // testing the results
    expect(results.body.status).toBe("success");
    expect(results.body.data).toBeTruthy();

    // verifying that the data has been correctly insterted into the database
    expect(results.body.data.data.firstName).toBe(firstName);
    expect(results.body.data.data.lastName).toBe(lastName);
    expect(results.body.data.data.email).toBe(email);
    expect(results.body.data.data.phoneNumber).toBe(phoneNumber);

    done();
  });

  test("PUT/PATCH - Update Customer : Update only lastName", async function (done) {
    const results = await request(app)
      .put("/customer/customer/" + id)
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        lastName: "Updated LastName",
      });

    // testing the results
    expect(results.body.status).toBe("success");
    expect(results.body.data).toBeTruthy();

    // verifying that the data has been correctly insterted into the database
    expect(results.body.data.data.firstName).toBe(firstName);
    expect(results.body.data.data.lastName).toBe("Updated LastName");
    expect(results.body.data.data.email).toBe(email);
    expect(results.body.data.data.phoneNumber).toBe(phoneNumber);

    done();
  });

  test("PUT/PATCH - Update Customer : Update only phoneNumber", async function (done) {
    // reseting the data before updating one field
    await resetUpdateData();

    const results = await request(app)
      .put("/customer/customer/" + id)
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        phoneNumber: "+216 54 155 569",
      });

    // testing the results
    expect(results.body.status).toBe("success");
    expect(results.body.data).toBeTruthy();

    // verifying that the data has been correctly insterted into the database
    expect(results.body.data.data.firstName).toBe(firstName);
    expect(results.body.data.data.lastName).toBe(lastName);
    expect(results.body.data.data.email).toBe(email);
    expect(results.body.data.data.phoneNumber).toBe("+216 54 155 569");

    done();
  });

  test("PUT/PATCH - Update Customer : Update with wrong email format ", async function (done) {
    // reseting the data before updating one field
    await resetUpdateData();

    const results = await request(app)
      .put("/customer/customer/" + id)
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        email: "This email is so wrong",
      });

    // testing the results
    expect(results.body.status).toBe("success");
    expect(results.body.data).toBeTruthy();

    // verifying that the data has been correctly insterted into the database
    expect(results.body.data.data.firstName).toBe(firstName);
    expect(results.body.data.data.lastName).toBe(lastName);
    expect(results.body.data.data.email).toBe(email);
    expect(results.body.data.data.phoneNumber).toBe("+216 54 155 569");

    done();
  });

  test("PUT/PATCH - Update Customer : Update with wrong phoneNumber", async function (done) {
    // reseting the data before updating one field
    await resetUpdateData();

    const results = await request(app)
      .put("/customer/customer/" + id)
      // setting the authorization token
      .set("Authorization", "bearer " + token)
      .send({
        phoneNumber: "Is this even a phone number?",
      });

    // testing the results
    expect(results.body.status).toBe("success");
    expect(results.body.data).toBeTruthy();

    // verifying that the data has been correctly insterted into the database
    expect(results.body.data.data.firstName).toBe(firstName);
    expect(results.body.data.data.lastName).toBe(lastName);
    expect(results.body.data.data.email).toBe(email);
    expect(results.body.data.data.phoneNumber).toBe("+216 54 155 569");

    done();
  });

  test("PUT/PATCH - Update Customer : Update from an unauthorized User", async function (done) {
    // reseting the data before updating one field
    await resetUpdateData();

    // logging in with a different user
    const differentUser = await loginUser(
      "testing@jest.com",
      "StrongPassword19"
    );
    // getting that user's token
    const differentToken = differentUser.body.token.split(" ")[1];

    const results = await request(app)
      .put("/customer/customer/" + id)
      // setting the authorization token
      .set("Authorization", "bearer " + differentToken)
      .send({
        phoneNumber: "Is this even a phone number?",
      });

    // testing the results
    expect(results.body.message).toBe("No document found with that ID");

    // it's better if the response would be descriptive and send the proper status code for unauthrized actions

    done();
  });
});

describe("Testing '/customer/customer/:id' route : DELETE operation", () => {
  const generateRandomCustomerID = async () => {
    const customersGetResults = await request(app)
      .get("/customer/customers/")
      // setting the authorization token
      .set("Authorization", "bearer " + token);

    // this will contain the user's customers array
    const customers = customersGetResults.body.customers;

    // this will test if the current user already created customers
    expect(customers.length).toBeGreaterThanOrEqual(0);

    // this will generate a random index that belongs to the array's range
    const randomIndexInsideCustomersArray = Math.floor(
      Math.random() * Math.floor(customers.length)
    );

    // this will get the selected customer's ID
    const randomCustomerID = customers[randomIndexInsideCustomersArray].id;
    return randomCustomerID;
  };
  // bcs - wrong id - unauth id

  test("DELETE - Delete Customer : Best case scenario", async function (done) {
    // generate a random customer ID from the database
    const randomCustomerID = await generateRandomCustomerID();

    const results = await request(app)
      .delete("/customer/customer/" + randomCustomerID)
      // setting the authorization token
      .set("Authorization", "bearer " + token);

    expect(results.status).toBe(204);

    done();
  });

  test("DELETE - Delete Customer : Unauthorized customer ID", async function (done) {
    // generate a random customer ID from the database with the current user
    const randomCustomerID = await generateRandomCustomerID();

    // logging in with a different user
    const differentUser = await loginUser(
      "testing@jest.com",
      "StrongPassword19"
    );
    // getting that user's token
    const differentToken = differentUser.body.token.split(" ")[1];

    const results = await request(app)
      .delete("/customer/customer/" + randomCustomerID)
      // setting the authorization token
      .set("Authorization", "bearer " + differentToken);

    expect(results.body.message).toBe("No document found with that ID");

    done();
  });

  test("DELETE - Delete Customer : Wrong customer ID", async function (done) {
    const results = await request(app)
      .delete(
        "/customer/customer/" +
          "This is a really wrong statement for an ID I guess?"
      )
      // setting the authorization token
      .set("Authorization", "bearer " + token);

    expect(results.body.message).toBe("No document found with that ID");

    done();
  });
});
