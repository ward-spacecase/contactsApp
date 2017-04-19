
const express = require('express');

const app = express();

const fs = require('fs');

const bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.all('/*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/', function(req, res){
  res.setHeader('Content-Type', 'application/json');

  fs.readFile('contacts.json', function(err, data){

    if(err) return err;
    var newData = JSON.parse(data);

    newData.contacts.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );     //sorts array alphabetically

    res.send(newData.contacts);

});


});


app.post('/update', function(req, res){

  console.log('POST!!!');

  var options = {flag: 'w'};

  var file = {
    "contacts": req.body
  };

  file = JSON.stringify(file);



  fs.writeFile('contacts.json', file, options, function(err, data){
    if(err) throw err;
    console.log('File Save!');
  });

});

app.listen(4500, function() {
  console.log('Listening...');
});

