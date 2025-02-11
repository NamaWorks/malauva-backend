const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const {
  getUsers,
  getUserById,
  userLogin,
  userSignup,
  deleteUser,
  updateUser,
  populateUsers,
  getLastIdNumber,
  getUserDataFromToken,
  patchUser,
} = require("../controllers/User.controllers");

const userRouter = require("express").Router();

userRouter.get("/", [isAdmin], getUsers);
userRouter.get("/lastid", getLastIdNumber);
userRouter.get("/profile",[isAuth], getUserDataFromToken);
userRouter.get("/cart",[isAuth], getUserDataFromToken);
userRouter.get("/id/:id", [isAdmin], getUserById);
userRouter.post("/login", userLogin);
userRouter.post("/signup", userSignup);
userRouter.delete("/delete/:id", [isAuth], deleteUser);
// userRouter.patch("/update/:id", [isAuth], updateUser); <- this one would be a put endpoint, as it modifies the whole User
userRouter.patch("/update/:id", [isAuth], patchUser);
userRouter.get("/", populateUsers);

module.exports = userRouter;