const {
  upload,
  deleteImgCloudinary,
} = require("../../middlewares/files.middleware");
const { isAdmin } = require("../../middlewares/isAdmin");
const {
  getWines,
  getWineById,
  getWinesByTaste,
  getWinesByColor,
  getWinesByTemperature,
  getWinesByOrigin,
  deleteWineById,
  updateWineById,
  createWine,
  populateWines,
  getWineByIdNumber,
} = require("../controllers/Wine.controllers");

const winesRouter = require("express").Router();

winesRouter.get("/", getWines);
winesRouter.get("/:id", getWineById);
winesRouter.get("/idNumber/:idNumber", getWineByIdNumber);
winesRouter.get("/taste/:taste", getWinesByTaste);
winesRouter.get("/color/:color", getWinesByColor);
winesRouter.get("/temperature/:idealTemperature", getWinesByTemperature);
winesRouter.get("/origin/:origin", getWinesByOrigin);
winesRouter.post("/create", [isAdmin], upload.single("picture"), createWine);
winesRouter.delete("/remove/:id", [isAdmin], deleteWineById);
winesRouter.patch(
  "/update/:id",
  [isAdmin],
  upload.single("picture"),
  updateWineById,
);
winesRouter.get("/", populateWines);

module.exports = winesRouter;
