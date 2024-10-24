const mongoose = require("mongoose")

const User = require("../api/models/User.model")
const Wine = require("../api/models/Wine.model")
const Purchase = require("../api/models/Purchase.model")

require("dotenv").config();

const  feedData = async (dataToFeed, collection) => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(async () => {
        switch (collection) {
          case 'users':
            const allUsers = await User.find()
            allUsers.length ? await User.collection.drop() : console.log("users collection already empty")
            break;

          case 'wines': 
            const allWines = await Wine.find()
            allWines.length ? await Wine.collection.drop() : console.log("wines collection already empty")
            break;

          case 'purchases': 
            const allPurchases = await Purchase.find()
            allPurchases.length ? await Purchase.collection.drop() : console.log("purchases collection already empty")
            break;

          default:
            console.log(`the collection '${collection}' is not registered`)
            break;
        }
      })
      .catch((err)=>{
        console.log(`error emptying ${collection} collection: ${err}`)
        process.exit()
      })

      // ---------------------continue here----------------------------------
      .then(async()=>{

        if(collection == "users"){
          const purchasesDb = await Purchase.find()
          console.log(purchasesDb)
          for (const user in dataToFeed) {
            let purchasesData = []
            dataToFeed[user].purchases.forEach(purchase => {
              purchasesDb.forEach((purchaseItem)=>{
                purchaseItem.idNumber == purchase && purchasesData.push((purchaseItem._id))
              })
            });

            dataToFeed[user].purchases = purchasesData

          }
        }
      })
      .catch((error)=>{console.log(error)})

      // -----------------------from here to above is the collection connection for the purchase id ------------------------------------

      .then(async () => {
        switch(collection) {
          case 'users':

          console.log(dataToFeed)

            await User.insertMany(dataToFeed)
            console.log(`${collection} data uploaded to DB`)
            break;

          case 'wines': 
            await Wine.insertMany(dataToFeed)
            console.log(`${collection} data uploaded to DB`)
            break;

          case 'purchases': 
            await Purchase.insertMany(dataToFeed)
            console.log(`${collection} data uploaded to DB`)
            break;

          default:
            console.log(`the collection '${collection}' is not registered`)
            break;
        }
        process.exit()
      })
      .catch((err) => {
        console.log(`error uploading ${collection} to DB: ${err}`)
        process.exit()
      })
  } catch (err) {
    console.log(`error feeding the DB: ${err}`)
  }
}

module.exports = { feedData }