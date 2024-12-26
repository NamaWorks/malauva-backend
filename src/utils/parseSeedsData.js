const parseSeedUsers = (data) => {
  const arr = data.split("\n");

  class user {
    constructor(
      idNumber,
      personName,
      username,
      email,
      password,
      purchases,
      paymentMethods,
      adresses,
      vatNumber,
      role,
      lastConnection,
      scoresGiven,
      phoneNumber,
    ) {
      this.idNumber = idNumber;
      this.personName = personName.replaceAll(",", "").replaceAll(`"`, "");
      this.username = username.replaceAll(",", "").replaceAll(`"`, "");
      this.email = email.replaceAll(",", "").replaceAll(`"`, "");
      this.password = password;
      this.purchases = purchases.split(" ");
      this.paymentMethods = paymentMethods;
      this.adresses = adresses
        .replaceAll(`"`, "")
        .replaceAll("{", "")
        .replaceAll("}", "")
        .replace("address: ", "")
        .trimStart();
      this.vatNumber = vatNumber;
      this.role = role == "admin" ? (role = "admin") : (role = "user");
      this.lastConnection = lastConnection ? lastConnection : new Date();
      this.scoresGiven = scoresGiven.replace("\r", "").split(" ");
      this.phoneNumber = phoneNumber;
    }
  }

  let usersArr = [];

  for (let i = 1; i < arr.length; i++) {
    const itemInfo = arr[i].split(";");
    usersArr.push(
      new user(
        itemInfo[0], //idNumber
        itemInfo[1], // personName
        itemInfo[2], // username
        itemInfo[3], // password
        itemInfo[4], // purchases
        itemInfo[5], // paymentMethods
        itemInfo[6], // adresses
        itemInfo[7], // vatNumber
        itemInfo[8], // role
        itemInfo[9], // lastConnection
        itemInfo[10], // scoresGiven
        itemInfo[11], // phoneNumber
        itemInfo[12] || 0,
      ),
    );
  }
  return usersArr;
};

const parseSeedWines = (data) => {
  const arr = data.split("\n");

  class wine {
    constructor(
      idNumber,
      name,
      description,
      picture,
      taste,
      idealTemperature,
      origin,
      scores,
      price,
    ) {
      this.idNumber = idNumber;
      this.name = name;
      this.description = description;
      this.picture = picture;
      this.taste = taste;
      this.idealTemperature = idealTemperature;
      this.origin = origin;
      this.scores = scores.split(" ");
      this.price = price;
    }
  }

  let winesArr = [];

  for (let i = 1; i < arr.length; i++) {
    const itemInfo = arr[i].split(";");
    winesArr.push(
      new wine(
        itemInfo[0],
        itemInfo[1],
        itemInfo[2],
        itemInfo[3],
        itemInfo[4],
        itemInfo[5],
        itemInfo[6],
        itemInfo[7],
        itemInfo[8],
      ),
    );
  }
  return winesArr;
};

const parseSeedPurchases = (data) => {
  const arr = data.replaceAll("\r", "").split("\n");

  class purchase {
    constructor(
      idNumber,
      client,
      itemsBought,
      totalSpent,
      paymentMethod,
      adress,
      vatNumber,
      date,
      status,
    ) {
      this.idNumber = idNumber;
      this.client = client;
      this.itemsBought = itemsBought.split(" ");
      this.totalSpent = totalSpent;
      this.paymentMethod = paymentMethod;
      this.adress = adress;
      this.vatNumber = vatNumber == "TRUE" ? true : false;
      this.date = date == "" ? new Date() : date;
      this.status = status || "processing";
    }
  }

  let purchasesArr = [];

  for (let i = 1; i < arr.length; i++) {
    const itemInfo = arr[i].split(";");
    purchasesArr.push(
      new purchase(
        itemInfo[0],
        itemInfo[1],
        itemInfo[2],
        itemInfo[3],
        itemInfo[4],
        itemInfo[5],
        itemInfo[6],
        itemInfo[7],
        itemInfo[8],
      ),
    );
  }
  return purchasesArr;
};

module.exports = { parseSeedUsers, parseSeedWines, parseSeedPurchases };
