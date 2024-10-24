const parseSeedUsers = (data) => {
  const arr = data.split("\n")
  
  class user {
    constructor (idNumber, personName, username, email, password, purchases, paymentMethods, adresses, vatNumber, lastConnection, role, scoresGiven) {
      this.idNumber =idNumber
      this.personName = personName.replaceAll(",","").replaceAll(`"`, "")
      this.username = username.replaceAll(",","").replaceAll(`"`, "")
      this.email =  email.replaceAll(",", "").replaceAll(`"`, "")
      this.password = password
      this.purchases = purchases.split(" ")
      this.paymentMethods = paymentMethods
      this.adresses = adresses.replaceAll(`"`, "").replaceAll("{","").replaceAll("}", "" ).replace("address: ","").trimStart()
      this.vatNumber = vatNumber
      this.lastConnection = lastConnection ? lastConnection : new Date()
      this.role= role == "admin" ? role = "admin" : role = "user"
      this.scoresGiven = scoresGiven.replace("\r", "").split(" ")
    }
  }

  let usersArr = []

  for (let i = 1; i < arr.length; i++) {
    const itemInfo = arr[i].split(";")
    usersArr.push(new user(itemInfo[0], itemInfo[1], itemInfo[2], itemInfo[3], itemInfo[4], itemInfo[5], itemInfo[6], itemInfo[7], itemInfo[8], itemInfo[9], itemInfo[10], itemInfo[11]))
  }
  return usersArr
}

const parseSeedWines = (data) => {
  const arr = data.split("\n")
  
  class wine {
    constructor (idNumber, name, brand, picture,  taste, color, idealTemperature, origin, scores, price) {
      this.idNumber=idNumber
      this.name=name
      this.brand = brand
      this.picture = picture
      this.taste = taste
      this.color = color
      this.idealTemperature = idealTemperature
      this.origin = origin
      this.scores = scores.split("")
      this.price = price
    }
  }

  let winesArr = []

  for (let i = 1; i < arr.length; i++) {
    const itemInfo = arr[i].split(";")
    winesArr.push(new wine(itemInfo[0], itemInfo[1], itemInfo[2], itemInfo[3], itemInfo[4], itemInfo[5], itemInfo[6], itemInfo[7], itemInfo[8], itemInfo[9]))
  }
  return winesArr
}

const parseSeedPurchases = (data) => {
  const arr = data.split("\n")
  
  class purchase {
    constructor (idNumber, client, itemsBought, totalSpent,  paymentMethod, adress, vatNumber, date) {
      this.idNumber=idNumber
      this.client=client
      this.itemsBought = itemsBought
      this.totalSpent = totalSpent
      this.paymentMethod = paymentMethod
      this.adress = adress
      this.vatNumber = vatNumber=="TRUE" ? true : false
      this.date = date
    }
  }

  let purchasesArr = []

  for (let i = 1; i < arr.length; i++) {
    const itemInfo = arr[i].split(";")
    purchasesArr.push(new purchase(itemInfo[0], itemInfo[1], itemInfo[2], itemInfo[3], itemInfo[4], itemInfo[5], itemInfo[6], itemInfo[7]))
  }
  return purchasesArr
}

module.exports = { parseSeedUsers, parseSeedWines, parseSeedPurchases }