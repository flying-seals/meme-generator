import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();


const listMemes = (res)=>{

    let dir = path.join(__dirname,'memes');
  
    fs.readdir(dir, (err,files)=>{
        if (err) throw err;
        files = files.map(file => file.replace('.jpg',''));
        res.send(files)
    }); 
}

const getMemes = (req,res)=>{
    let image =path.join(__dirname,'memes', req.params.id + '.jpg');

    fs.readFile(image,(err, data)=>{
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data);
    });
}

const deleteMemes = (req,res)=>{
    let image =path.join(__dirname,'memes', req.params.id + '.jpg')

    fs.stat(image, (err,stats)=>{
        if (err) throw err;
        fs.unlink(image,(err)=>{
            if (err) throw err;
            res.end(req.params.id.toString());
        });
    });
}

const MemesController = {
    get: getMemes,
    list: listMemes,
    delete: deleteMemes
}


export default MemesController;