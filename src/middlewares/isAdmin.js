const User = require("../api/models/User.model")
const { verifyJwt } = require("../utils/jwt")

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    !token ? res.status(400).json(`you're not authorised`) : console.log(`you're authorised`)

    const parsedToken = token.replace("Bearer ", "")
    const validToken = verifyJwt(parsedToken, process.env.JWT_SECRET)
    const userLoged = await User.findById(validToken.id)

    const userRole = userLoged.role

    if(userRole=="admin"){
      userLoged.password = null
      next()
    } else {
      return res.status(400).json(`you're not an admin`)
    }

  } catch (error) {
    return res.status(400).json(`you are not an admin: ${error}`)
  }
}

module.exports = { isAdmin }