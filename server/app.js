
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const url = "mongodb://localhost:27017/contactsDatabase";

MongoClient.connect(url, function(err, db){
  if(!err){
    console.log("Database is online!");
  }

  db.close();

});


app.all('/*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/', function(req, res){

  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
      return;
    }
    var collection = db.collection('contacts');

    collection.find({}).toArray(function(err, docs){

      res.send(docs);
      db.close();

    });


  });


});


app.post('/addContact', function(req, res){

  console.log(' - - - ADD REQUEST - - - ');


  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
      return;
    }
    var collection = db.collection('contacts');
    collection.insertOne(req.body);
    collection.find({}).toArray(function(err, docs){

      res.send(docs);
      db.close();

    });


  });

});

app.post('/delContact', function(req, res){

  console.log(' - - - DELETE REQUEST - - - ');




  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
      return;
    }
    var collection = db.collection('contacts');
    try {

      collection.deleteOne({"_id": ObjectID(req.body._id)});

    } catch (e) {
      console.log(e);
    }


    collection.find({}).toArray(function(err, docs){
      res.send(docs);
      db.close();

    });


  });

});

app.post('/search', function(req, res){




  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
      return;
    }

    var collection = db.collection('contacts');


    collection.find({"name": new RegExp(req.body.name, "i")}).toArray(function(err, docs){


      res.send(docs);
      db.close();

    });


  });

});

app.post('/filter', function(req, res){




  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
      return;
    }

    var collection = db.collection('contacts');


    collection.find({"name": new RegExp(req.body.name, "i")}).sort({name: req.body.filter}).toArray(function(err, docs){


      res.send(docs);
      db.close();

    });


  });

});


app.listen(4500, function() {
  console.log('Listening...');
});

