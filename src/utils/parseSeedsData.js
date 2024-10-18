const parseSeedUsers = (data) => {
  const arr = data.split("\n")
  
  class user {
    constructor (username, email, password,  purchases, paymentMethods, adresses, vatNumber,lastConnection) {
      this.username=username
      this.email = email
      this.password = password
      this.purchases = purchases
      this.paymentMethods = paymentMethods
      this.adresses = adresses
      this.vatNumber = vatNumber
      this.lastConnection = lastConnection
    }
  }

  let usersArr = []

  for (let i = 1; i < arr.length; i++) {
    const itemInfo = arr[i].split(";")
    usersArr.push(new user(itemInfo[0], itemInfo[1], itemInfo[2], itemInfo[3], itemInfo[4], itemInfo[5], itemInfo[6], itemInfo[7]))
  }
  return usersArr
}

const parseSeedWines = (data) => {
  const arr = data.split("\n")
  
  class wine {
    constructor (name, brand, picture,  taste, color, idealTemperature, scores, price) {
      this.name=name
      this.brand = brand
      this.picture = picture
      this.taste = taste
      this.color = color
      this.idealTemperature = idealTemperature
      this.scores = scores
      this.price = price
    }
  }

  let winesArr = []

  for (let i = 1; i < arr.length; i++) {
    const itemInfo = arr[i].split(";")
    winesArr.push(new wine(itemInfo[0], itemInfo[1], itemInfo[2], itemInfo[3], itemInfo[4], itemInfo[5], itemInfo[6], itemInfo[7]))
  }
  return winesArr
}

const parseSeedPurchases = (data) => {
  const arr = data.split("\n")
  
  class purchase {
    constructor (client, itemsBought, totalSpent,  paymentMethod, adress, vatNumber, date) {
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
    purchasesArr.push(new purchase(itemInfo[0], itemInfo[1], itemInfo[2], itemInfo[3], itemInfo[4], itemInfo[5], itemInfo[6]))
  }
  return purchasesArr
}

module.exports = { parseSeedUsers, parseSeedWines, parseSeedPurchases }