const  mongoose  = require("mongoose");
const supertest = require("supertest");
const server = require("../../index.js");

const api = supertest(server)

describe('users endpoints', ()=>{

  afterAll(()=>{
    mongoose.connection.close()
  })

  test("users return error 400 due to authentication", async () => {
    await api.get("/users/").set("Authorization", "Bearer TOKEN").expect(400);
  });

  test("getUserById returns error 400 due to authentication", async () => {
    await api
      .get("/users/67221da17aa5bdb2a60347a8")
      .set("Authorization", "Bearer TOKEN")
      .expect(400);
  });

  test("userSignUp returns 200 and json", async () => {
    const payload = {
      idNumber: 3000,
      personName: "tester",
      username: "test",
      password: "Test123!",
      email: "test@mail.com",
      role: "admin",
    };

    await api
      .post("/users/signup")
      .send(payload)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("userLogin returns 200 and json", async () => {
    const payload = { password: "Test123!", email: "test@mail.com" };

    await api
      .post("/users/login")
      .send(payload)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("updateUser returns 400 due to authentication", async () => {
    const payload = { password: "Test123!", email: "test@mail.com" };

    await api
      .patch("/users/67221da17aa5bdb2a60347a8")
      .set("Authorization", "Bearer TOKEN")
      .send(payload)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("deleteUser returns 400 due to authentication", async () => {
    await api
      .patch("/users/delete/67221da17aa5bdb2a60347a8")
      .set("Authorization", "Bearer TOKEN")
      .send(payload)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
})