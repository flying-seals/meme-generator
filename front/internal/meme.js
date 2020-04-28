const http = require('http')
const fs = require('fs')
const Stream = require('stream').Transform;
const promise = require('promise');


// Backend configuration
const backendPort = 3000
const backendAddress = process.env.BACKEND_ADDRESS||'localhost'


exports.getMemeID = function(text) {

    // HTTP request is an asynchronic operation. We need to wait for the response before taking further steps
    // We use Promise to accomplish this
    return new Promise(function (resolve, reject) {

      // User input data to send
      const data = JSON.stringify({
        text: text
      })
  
      // HTTP request config 
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
  
        // When whole data is received, extract important part of it and 
        // resolve the Promise
        res.on('data', (d) => {
            result = JSON.parse(d)
            id = result.id
            resolve(id)
          });
        
        
        // When request results with an error, "reject" the Promise
        req.on('error', (error) => {
            console.error(error)
            reject(error)
        })
  
      })

      // Specify what data should be sent
      req.write(data)

      // Finish the request
      req.end()
  
    })
  }

exports.getMeme = function (id) {

    // HTTP request is an asynchronic operation. We need to wait for the response before taking further steps
    // We use Promise to accomplish this
    return new Promise(function (resolve, reject) {

          // Variable to store image coming from the backend
          var image = new Stream() 

          // HTTP request config
          const options = {
            hostname: backendAddress,
            port: backendPort,
            path: `/memes/${id}`,
            method: 'GET',
          }
          
          
          const req = http.request(options, (res) => {
          
            // Data is received in chunks. We need to push it to predefined variable
            // and cannot resolve the Promise here
            res.on('data', (d) => {
                image.push(d)
              });
            
            
              // When request results with an error, "reject" the Promise
            req.on('error', (error) => {
                console.error(error)
                reject(error)
            })

            // When whole data has been received, save the image to local storage
            // to allow frontend to display it.
            // Resolbe the Promise
            res.on('end', function() {   
              fs.writeFileSync('public/meme.jpg', image.read())                                           
              resolve("Image fetched")                              
            }); 

          });

          // End the request
          req.end()

    })
}
