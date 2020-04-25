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
app.get('/memes/1', (req, res) => {
    res.sendFile(__dirname + "/public/meme.jpg")
})

app.post('/memes', (req, res) => {
    const data = JSON.stringify({
      id: 1
    })
    res.send(data)
})


// Meme page
app.post('/meme', (req, res) => {
    var getMemeIDPromise = getMemeID(req.body.memeText)
    getMemeIDPromise.then(function(result) {
      var getMemePromise = getMeme(result);
      getMemePromise.then(function(result){
        res.render('meme')
      }, function(err) {
        console.log(error)
        res.send("Internal error")
      })
    }, function(err) {
        console.log(err)
        res.send("Internal error")
    })

});

// Run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});


var getMemeID = function(text) {
  return new Promise(function (resolve, reject) {
    const data = JSON.stringify({
      text: text
    })

    const options = {
      hostname: backendAddress,
      port: backendPort,
      path: '/memes',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }

    const req = http.request(options, (res) => {

      res.on('data', (d) => {
          result = JSON.parse(d)
          id = result.id
          console.log(id)
          resolve(id)
        });
      
      
      req.on('error', (error) => {
          console.error(error)
          reject(error)
      })

    })
    req.write(data)
    req.end()

  })
}

// Send async meme request 
var getMeme = function (id) {
    return new Promise(function (resolve, reject) {

          var image = new Stream() 
          
          const options = {
            hostname: backendAddress,
            port: backendPort,
            path: `/memes/${id}`,
            method: 'GET',
          }
          
          const req = http.request(options, (res) => {
          
            res.on('data', (d) => {
                image.push(d)
              });
            
            
            req.on('error', (error) => {
                console.error(error)
                reject(error)
            })

            res.on('end', function() {   
              fs.writeFileSync('public/meme-test.jpg', image.read())                                           
              resolve("Image fetched")                              
            }); 

          });
          req.end()

    })
}
