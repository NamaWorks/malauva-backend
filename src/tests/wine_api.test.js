const mongoose = require("mongoose");
const supertest = require("supertest");
const server = require("../../index.js");
const { wineTestPayload, modifiedWineTestPayload } = require("../data/mockData.js");

const api = supertest(server);

describe("wines endpoints", () => {
  afterAll(() => {
    mongoose.connection.close();
  }, 5000);
  // The second value is a timeout

  beforeEach(() => {
    // console.clear()
  });

  test("wines are returned as a json", async () => {
    await api
      .get("/wines")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("getWineById working and return a json", async () => {
    await api
      .get("/wines/671ff3c1964e93bb20d0210b")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("getWinesByTaste working and return in json format", async () => {
    await api
      // .get('/wines/taste/taste test')
      .get("/wines/taste/taste test", (req, res) => {
        console.log(res);
      })
      // we can work with a callback function here to debug or prepare the data
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("getWinesByColor working and return in json format", async () => {
    await api
      .get("/wines/color/Red")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("getWinesByTemperature working and return in json format", async () => {
    await api
      .get("/wines/temperature/15")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("getWinesByOrigin working and return in json format", async () => {
    await api
      .get("/wines/origin/Spain")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("createWine returns error 400 due to authentication", async () => {
    const payload = wineTestPayload;

    await api
      .post("/wines/create")
      .set("Authorization", "Bearer TOKEN")
      // we must not forget to add what kind of authentication there is, if there is one
      .send(payload)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    // .then(res => console.log(res))
    // Do not forget that we can do .then in here
  }, 10000);
  // the third value in this test is overwriting the time limit for the test

  test("deleteWine returns error 400 due to authentication", async () => {
    await api
      .delete("/wines/remove/671ff3c1964e93bb20d0210b")
      .set("Authorization", "Bearer TOKEN")
      .expect(400)
      .then((res) => console.log("deleteWine tested"));
  });

  test("updateWine returns error 400 due to authentication", async () => {
    const payload = modifiedWineTestPayload
    await api
      .patch("/wines/update/671ff3c1964e93bb20d0210b")
      .set("Authorization", "Bearer TOKEN")
      .send(payload)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    // .then(res => console.log(res))
  });
});

// To avoid having the server running all the time, we can unable the server.listen(......) in the index.js file
