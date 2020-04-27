import Jimp from "jimp";
import uuid from "uuid";
import config from "../../config.js";
import fs from "fs";
import path from 'path';
import junk from "junk";

const loadImage = async (filePath) => {
  try {
    return await Jimp.read(filePath);
  } catch (error) {
    throw new Error(`while opening image: ${error}`);
  }
};

const loadFont = async (fontPath) => {
  try {
    return await Jimp.loadFont(fs.existsSync(fontPath) ? fontPath : Jimp.FONT_SANS_64_WHITE);
  } catch (error) {
    throw new Error(`while loading font: ${error}`);
  }
};

const addTextToImage = async (img, font, text) => {
  return img.print(
    font,
    0,
    0,
    {
      text: text.toUpperCase(),
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
    },
    img.bitmap.width,
    img.bitmap.height
  );
};

const saveImageToPath = async (img, fileName, path) => {
  try {
    await img.writeAsync(`${path}/${fileName}.jpg`);
  } catch (error) {
    throw new Error(`while saving file: ${error}`);
  }
};

const getRandomTemplate = () => {
  try {
    let files = fs.readdirSync(config.inputPath).filter(junk.not);
    return `${config.inputPath}/${
      files[Math.floor(Math.random() * files.length)]
    }`;
  } catch (error) {
    throw new Error(`while reading directory: ${error}`);
  }
};

async function generateMeme(caption) {
  let id = uuid.v4();
  try {
    let img = await loadImage(getRandomTemplate());
    let font = await loadFont(config.fontPath);

    let processedImage = await addTextToImage(img, font, caption);

    await saveImageToPath(processedImage, id, config.outputPath);
    return id;
  } catch (error) {
    throw error;
  }
}

export default generateMeme;
