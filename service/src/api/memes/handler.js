import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();

const createMeme = (req, res) => {
    res.send("create meme")
}

const getMeme = (req, res) => {
    
    let image =path.join(__dirname,'memes', req.params.id + '.jpg')

    fs.readFile(image,(err, data)=>{
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'image/jpeg'})
        res.end(data);
    });

    
}

const listMemes = (req, res) => {

   let dir = path.join(__dirname,'memes')
  
    fs.readdir(dir, (err,files)=>{
        if (err) throw err;
       files = files.map(file => file.replace('.jpg',''))
        res.send(files)
    }) 
}

const deleteMeme = (req, res) => {

    let image =path.join(__dirname,'memes', req.params.id + '.jpg')


    fs.stat(image, (err,stats)=>{
        if (err) throw err;
        fs.unlink(image,(err)=>{
            res.end(req.params.id);
        })
    })

}

const MemesHandler = {
    createMeme: createMeme,
    getMeme: getMeme,
    deleteMeme: deleteMeme,
    listMemes: listMemes
};

export default MemesHandler;