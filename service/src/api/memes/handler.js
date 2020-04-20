const createMeme = (req, res) => {
    res.send("create meme")
}

const getMeme = (req, res) => {
    res.send("get meme")
}

const deleteMeme = (req, res) => {
    res.send("delete meme")
}

const MemesHandler = {
    createMeme: createMeme,
    getMeme: getMeme,
    deleteMeme: deleteMeme
};

export default MemesHandler