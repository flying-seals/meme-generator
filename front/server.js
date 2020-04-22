const http = require('http')
const fs = require('fs')
const Stream = require('stream').Transform;
const express = require('express');
const bodyParser = require('body-parser');
const promise = require('promise');

const port = 8080;
const backendEndpoint = "/generate"
const backendPort = 8080
const backendAddress = 'localhost'

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
app.post(backendEndpoint, (req, res) => {
    res.sendFile(__dirname + "/public/meme.jpg");
})


// Meme page
app.post('/meme', (req, res) => {
    var getMemePromise = getMeme(req.body.memeText);
    getMemePromise.then(function(result) {
        res.render('meme');
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

          var image = new Stream();   
          
          const options = {
            hostname: backendAddress,
            port: backendPort,
            path: backendEndpoint,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': data.length
            }
          }
          
          const req = http.request(options, (res) => {
          
            res.on('data', (d) => {
                image.push(d);
              });
            
            
            req.on('error', (error) => {
                console.error(error);
                reject(error);
            })

            res.on('end', function() {   
              fs.writeFileSync('public/meme-test.jpg', image.read());                                           
              resolve("dupa")                              
            }); 

          });

          req.write(data)
          req.end()

    })
}
