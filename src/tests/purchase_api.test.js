const mongoose  = require("mongoose");
const supertest = require("supertest");
const server = require("../../index.js");
const api = supertest(server)

describe('purchases endpoints', ()=>{

  afterAll(()=>{
    mongoose.connection.close()
  }, )

  test('Purchases return error 400 due to authentication', async()=>{
    await api
    .get('/purchases')
    .set('Authorization', 'Bearer TOKEN')
    .expect(400)
    })
    
  test('getPurchaseById returns error 400 due to authentication', async()=>{
    await api
    .get('/purchases/671d0241b9f6db73dd403535')
    .set('Authorization', 'Bearer TOKEN')
    .expect(400)
    .expect('Content-Type', /application\/json/)

}, 10000)

test('createPurchase returns error 400 due to authentication', async()=>{
  const payload = {"idNumber": 4200, "client": 2020, "itemsBought": [1020, 1021, 1022], "status": "delivered"}
  await api
    .post('/wines/create')
    .set('Authorization', 'Bearer TOKEN')
    .send(payload)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    
  }, 10000)
  
  test('deletePurchase returns error 400 due to authentication', async()=>{
    await api
    .delete('/purchases/671d0241b9f6db73dd403535')
    .set('Authorization', 'Bearer TOKEN')
    .expect(400)
    .expect('Content-Type', /application\/json/)
  })
  
  test('updatePurchase returns error 400 due to authentication', async()=>{
    await api
    .patch('/purchases/671d0241b9f6db73dd403535')
    .set('Authorization', 'Bearer TOKEN')
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

})
