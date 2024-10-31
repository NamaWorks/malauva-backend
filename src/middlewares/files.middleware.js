require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  folder: "MalaUva",
  allowedFormats: ["jpg", "png", "jpeg", "gif"],
});

const upload = multer({ storage });

const deleteImgCloudinary = (imgUrl) => {
  const imgSplitted = imgUrl.split("/");
  const nameSplitted = imgSplitted[imgSplitted.length - 1].split(".");
  const folderSplitted = imgSplitted[imgSplitted.length - 2];
  const public_id = `${folderSplitted}/${nameSplitted[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log(`image deleted in cloudinary`);
  });
};

const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};

module.exports = { deleteImgCloudinary, configCloudinary, upload };
