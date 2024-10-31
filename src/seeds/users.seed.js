const fs = require("fs");
const { parseSeedUsers } = require("../utils/parseSeedsData.js");
const { feedData } = require("./feedData.js");

fs.readFile(
  "./src/seeds/files/002_MalaUva_SeedFile-users.csv",
  "utf8",
  (error, data) => {
    error ? console.log(error) : feedData(parseSeedUsers(data), "users");
  },
);
