const logger = require("../utils/logger");
const { entryLog } = require("../utils/commons");
const { fu } = require("../logics");
var path = require("path");

const update = async (apiVersion, req, res, next) => {
  // console.log(req.files.image);
  let sampleFile = req.files.image;
  let uploadPath = path.join(__dirname, "../" + sampleFile.name);
  await sampleFile.mv(uploadPath);
  await fu.singleFileUpload(sampleFile, res);
};
const updates = async (apiVersion, req, res, next) => {
  sampleFile = req.files.image;
  const uploadPaths = [];
  sampleFile.map((img) => {
    let savePath = path.join(__dirname, "../" + img.name);
    img.mv(savePath);
    uploadPaths.push(img.name);
  });
  console.log(uploadPaths);
  await fu.multiFileUpload(uploadPaths, res);
};

module.exports = {
  update,
  updates,
};
