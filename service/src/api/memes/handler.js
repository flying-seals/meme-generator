import MemesController from "./controller.js";

async function createMeme(req, res) {
    try {
      let memeId = await MemesController.create(req.body.text);
      return res.status(201).json({
        id: memeId,
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  
    res.send("create meme");
  }

const getMeme = async (req, res) => {
  try {
    let data = await MemesController.get(req, res);
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const listMemes = async (req, res) => {
  try {
    let files = await MemesController.list(res);
    res.send(files);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteMeme = async (req, res) => {
  try {
    await MemesController.delete(req, res);
    res.end(req.params.id.toString());
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const MemesHandler = {
  createMeme: createMeme,
  getMeme: getMeme,
  deleteMeme: deleteMeme,
  listMemes: listMemes,
};

export default MemesHandler;