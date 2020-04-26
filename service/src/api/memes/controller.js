import fs from "fs";
import path from "path";
const __dirname = path.resolve();

const listMemes = async (res) => {
  let dir = path.join(__dirname, "memes");

  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) reject(err);

      files = files.map((file) => file.replace(".jpg", ""));
      resolve(files);
    });
  });
};

const getMemes = async (req, res) => {
  let image = path.join(__dirname, "memes", req.params.id + ".jpg");

  return new Promise((resolve, reject) => {
    fs.readFile(image, (err, data) => {
      if (err) reject(err);

      resolve(data);
    });
  });
};

const deleteMemes = async (req, res) => {
  let image = path.join(__dirname, "memes", req.params.id + ".jpg");

  return new Promise((resolve, reject) => {
    fs.stat(image, (err, stats) => {
      if (err) reject(err);
      fs.unlink(image, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  });
};

const MemesController = {
  get: getMemes,
  list: listMemes,
  delete: deleteMemes,
};

export default MemesController;
