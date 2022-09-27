const express = require('express');
const app = express();
const port = 80;
const path = require('path');

app.use('/', express.static('client'));

app.get('/*', function(req,res) {
    res.sendFile(path.join( __dirname + '/client/index.html'));
  });

app.listen(port, () =>{
    console.log('main running at: ' + port);
});