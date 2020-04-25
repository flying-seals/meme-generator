const http = require('http')
const express = require('express');
const bodyParser = require('body-parser');
const handler = require('./internal/meme.js')

const port = 8080;

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

// Meme page
app.post('/meme', (req, res) => {
    var getMemeIDPromise = handler.getMemeID(req.body.memeText)

    // Send a POST request to the backend to generate a meme with user input
    // Response is an ID of the generated meme in JSON format
    getMemeIDPromise.then(function(result) {
      var getMemePromise = handler.getMeme(result);
      // Send a GET request to the backend to fetch a meme generated above
      // Response is an image
      getMemePromise.then(function(result){
        res.render('meme')
      }, 
      // Handle error from meme fetching
      function(err) {
        console.log(error)
        res.send("Internal error")
      }) 
    }, 
    // Handle errors from meme generation 
    function(err) {
        console.log(err)
        res.send("Internal error")
    })

});

// Fake endpoints DELETE THEM
app.get('/memes/1', (req, res) => {
  res.sendFile(__dirname + "/public/meme.jpg")
})
app.post('/memes', (req, res) => {
  const data = JSON.stringify({
    id: 1
  })
  res.send(data)
})

// Run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});