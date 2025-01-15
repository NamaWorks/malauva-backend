const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2

const User = require("../api/models/User.model");
const Wine = require("../api/models/Wine.model");
const Purchase = require("../api/models/Purchase.model");
const { configCloudinary } = require("../middlewares/files.middleware");

require("dotenv").config();

configCloudinary();

const feedData = async (dataToFeed, collection) => {

  let wineCollectionAfterUploadingImg = []

  try {
  await mongoose
    .connect(process.env.DB_URL)
      .then(async () => {
        switch (collection) {
          case "wines":

            await cloudinary.api.delete_resources_by_prefix(
              "MalaUva",
              function (result) { console.log('images removed from cloudinary')}
            );

            for (let i = 0; i < dataToFeed.length; i++) {
            // for (let i = 0; i < 20; i++) {
              const wine = dataToFeed[i];
              console.log(i)

              try {
                await cloudinary.uploader
                  .upload(wine.picture, {
                    use_filename: true,
                    folder: "MalaUva",
                  })
                  .then((res) => {
                    wineCollectionAfterUploadingImg.push({
                      ...wine,
                      picture: res.url,
                    });
                    // console.log(wineCollectionAfterUploadingImg)
                  });
              } catch (error) {
                console.log(error);
              }
            }
        }
      })
    .then(async () => {
      switch (collection) {
        case "users":
          const allUsers = await User.find();
          allUsers.length
            ? await User.collection.drop()
            : console.log("users collection already empty");
          break;

        case "wines":
          const allWines = await Wine.find();
          allWines.length
            ? await Wine.collection.drop()
            : console.log("wines collection already empty");
          break;

        case "purchases":
          const allPurchases = await Purchase.find();
          allPurchases.length
            ? await Purchase.collection.drop()
            : console.log("purchases collection already empty");
          break;

        default:
          console.log(`the collection '${collection}' is not registered`);
          break;
      }
    })
    .catch((err) => {
      console.log(`error emptying ${collection} collection: ${err}`);
      process.exit();
    })

    .then(async () => {
      switch (collection) {
        case "users":
          const purchasesDb = await Purchase.find();
          for (const user in dataToFeed) {
            let purchasesData = [];
            dataToFeed[user].purchases.forEach((purchase) => {
              purchasesDb.forEach((purchaseItem) => {
                purchaseItem.idNumber == purchase &&
                  purchasesData.push(purchaseItem._id);
              });
            });
            dataToFeed[user].purchases = purchasesData;
          }
          const winesDb = await Wine.find();
          for (const user in dataToFeed) {
            let winesData = [];
          }
          break;

        case "purchases":
          const usersDb = await User.find();
          for (const purchase in dataToFeed) {
            let usersData;
            usersDb.forEach((user) => {
              purchase.client == purchase.idNumber && (usersData = user._id);
            });
            dataToFeed[purchase].client = usersData;
          }

          const winesDbPurchase = await Wine.find();
          for (const purchase in dataToFeed) {
            let winesData = [];
            // console.log(dataToFeed[purchase]);
            dataToFeed[purchase].itemsBought.forEach((item) => {
              // console.log(item);
              winesDbPurchase.forEach((wine) => {
                wine.idNumber == item && winesData.push(wine._id);
              });
            });
            dataToFeed[purchase].itemsBought = winesData;
            // console.log(dataToFeed);
          }
          break;

        case "wines":
          const usersDbForWines = await User.find();
          for (const wine in wineCollectionAfterUploadingImg) {
            // console.log(dataToFeed[wine])
            let usersData = [];
            usersDbForWines.forEach((user) => {
              wineCollectionAfterUploadingImg[wine].scores.forEach((score) => {
                score == user.idNumber && usersData.push(user._id);
              });
            });
            wineCollectionAfterUploadingImg[wine].scores = usersData;
            console.log(wineCollectionAfterUploadingImg[wine]);
          }
          break;
      }
    })
    .catch((error) => {
      console.log(error);
    })

    .then(async () => {
      switch (collection) {
        case "users":
          // console.log(dataToFeed);

          await User.insertMany(dataToFeed);
          console.log(`${collection} data uploaded to DB`);
          break;

        case "wines":
          await Wine.insertMany(wineCollectionAfterUploadingImg);
          console.log(`${collection} data uploaded to DB`);
          break;

        case "purchases":
          await Purchase.insertMany(dataToFeed);
          console.log(`${collection} data uploaded to DB`);
          break;

        default:
          console.log(`the collection '${collection}' is not registered`);
          break;
      }
      process.exit();
    })
    .catch((err) => {
      console.log(`error uploading ${collection} to DB: ${err}`);
      process.exit();
    });
  } catch (err) {
    console.log(`error feeding the DB: ${err}`);
  }
};

module.exports = { feedData };
