import MemesController from './controller.js'

const createMeme = (req, res) => {
    res.send("create meme")
}

const getMeme = (req, res) => {
    
   try{ 
       MemesController.get(req,res);
    }catch(error){
        res.status(500);
    }
}

const listMemes = (req, res) => {

    MemesController.list(res)

}

const deleteMeme = (req, res) => {

    MemesController.delete(req,res)

}

const MemesHandler = {
    createMeme: createMeme,
    getMeme: getMeme,
    deleteMeme: deleteMeme,
    listMemes: listMemes
};

export default MemesHandler;