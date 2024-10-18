const fs = require("fs")
const { parseSeedPurchases } = require("../utils/parseSeedsData.js")
const { feedData } = require("./feedData.js")

fs.readFile("./src/seeds/files/001_MalaUva_SeedFile-purchases.csv", "utf8", (error, data) => {
  error ? console.log(error) : feedData(parseSeedPurchases(data), "purchases")
})