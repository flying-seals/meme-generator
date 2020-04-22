const http = require('http')
const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const promise = require('promise');
const q = require('q');

const port = 8080;
const memeEndpoint = "/generate"

// Configure express
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


// Main page
app.get('/', (req, res) => {
	res.render('index')
});

// Fake endpoint
app.post(memeEndpoint, (req, res) => {
    console.log(__dirname + "/public/meme.jpg");
    res.sendFile(__dirname + "/public/meme.jpg");
})


// Meme page
app.post('/meme', (req, res) => {
    
    var getMemePromise = getMeme(req.body.memeText)
    getMemePromise.then(function(result) {
        image = result;
        console.log(image.file);
        res.render('meme', { memeImage: image });
    }, function(err) {
        console.log(err);
        res.send("Internal error");
    })

});

// Run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Send async meme request 
var getMeme = function (text) {
    const data = JSON.stringify({
        text: text
    });

    const options = {
        hostname: 'localhost',
        port: 8080,
        path: memeEndpoint,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    return new Promise(function (resolve, reject) {

        var imagedata = ''
        var filepath = 'public/meme-tmp.jpg'

        const req = http.request(options, res => {
            res.setEncoding('binary')

            // Handle incoming data
            res.on('data', response => {
                console.log("zbieram data");
                imagedata += response;
                
            })

            // Handle error
            req.on('error', error => {
                console.error(error);
                reject("Internal error" + error);
            })

            // Handle end of request
            res.on('end', function(){
                console.log("TU JESTEM");
                fs.writeFile('filepath', imagedata, 'binary', function(err) {
                    if (err) throw err
                    console.log('File saved.')
                })
                console.log("A TERAZ TU");
                resolve(filepath);
            })
        
            req.write(data);
            req.end();
        });
    })
}
