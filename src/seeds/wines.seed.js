const fs = require("fs");
const { parseSeedWines } = require("../utils/parseSeedsData.js");
const { feedData } = require("./feedData.js");

fs.readFile(
  "./src/seeds/files/006_MalaUva_SeedFile-wines.csv",
  "utf8",
  (error, data) => {
    error ? console.log(error) : feedData(parseSeedWines(data), "wines");
  },
);
