const http = require('http')
const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const promise = require('promise');

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
    console.log("backend");
    res.send("image");
})


// Meme page
app.post('/meme', (req, res) => {
    console.log("in meme");
    var getMemePromise = getMeme(req.body.memeText);
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
    return new Promise(function (resolve, reject) {

        const data = JSON.stringify({
            text: text
          })
          
          const options = {
            hostname: 'localhost',
            port: 8080,
            path: '/generate',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': data.length
            }
          }
          
          const req = http.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`);
          
            res.on('data', (d) => {
                console.log(d);
                resolve(d);
                })
            })
            
            req.on('error', (error) => {
                console.error(error);
                reject(error);
            })
          
          req.write(data)
          req.end()

    })
}
