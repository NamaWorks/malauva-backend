const User = require("../api/models/User.model");
const { verifyJwt } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    !token && res.status(400).json(`you're not authorised`);

    const parsedToken = token.replace("Bearer ", "");
    const { id } = verifyJwt(parsedToken);

    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json(`you're not authorised: ${error}`);
  }
};

module.exports = { isAuth };
