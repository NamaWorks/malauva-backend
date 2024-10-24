const parseSeedUsers = (data) => {
  const arr = data.split("\n")
  
  class user {
    constructor (idNumber, username, email, password, paymentMethods, adresses, vatNumber, lastConnection, role, scoresGiven, purchases) {
      this.idNumber=idNumber
      this.username=username
      this.email = email
      this.password = password
      this.paymentMethods = paymentMethods
      this.adresses = adresses
      this.vatNumber = vatNumber
      this.lastConnection = lastConnection
      this.role=role
      this.purchases = purchases
      this.scoresGiven = scoresGiven
    }
  }

  let usersArr = []

  for (let i = 1; i < arr.length; i++) {
    const itemInfo = arr[i].split(";")
    console.log(itemInfo)
    usersArr.push(new user(itemInfo[0], itemInfo[1], itemInfo[2], itemInfo[3], itemInfo[4], itemInfo[5], itemInfo[6], itemInfo[7], itemInfo[8], itemInfo[9], itemInfo[10]))
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
      this.vatNumber = vatNumber
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