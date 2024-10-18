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

module.exports = { parseSeedUsers }