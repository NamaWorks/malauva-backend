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
      .get("/users/671ff3c49985ad49c2efcb34")
      .set("Authorization", "Bearer TOKEN")
      .expect(400);
  });

  test("userSignUp returns 200 and json", async () => {
    const payload = {
      idNumber: 5000,
      personName: "testJEST",
      username: "testJEST",
      password: "Test123!",
      email: "testJEST6@mail.com",
      role: "admin",
    };

    await api
      .post("/users/signup")
      .send(payload)
      .expect(201)
      .then(res=>console.log(res))
      // .expect("Content-Type", /application\/json/)
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
    const payload = { password: "Test123!", email: "testador1@mail.com" };

    await api
      .patch("/users/update/671ff3c49985ad49c2efcb43")
      .set("Authorization", "Bearer TOKEN")
      .send(payload)
      .expect(400)
      .then((res=>console.log(res)))
      // .expect("Content-Type", /application\/json/);
  });

  test("deleteUser returns 400 due to authentication", async () => {
    await api
      .delete("/users/delete/671ff3c49985ad49c2efcb43")
      .set("Authorization", "Bearer TOKEN")
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
})