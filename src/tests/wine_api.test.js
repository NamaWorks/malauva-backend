const  mongoose  = require("mongoose");
const supertest = require("supertest");
const server = require("../../index");

const api = supertest(server)

describe('wines endpoints', ()=> {
  
  test('wines are returned as a json', async()=>{
    await api
      .get('/wines')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  afterAll(()=>{
    mongoose.connection.close()
  })

})
