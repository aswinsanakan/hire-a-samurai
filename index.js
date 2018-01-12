const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;
const databaseUri = process.env.DATABASE_URI || 'mongodb://localhost/samuraidb';

// connect to mongodb
mongoose.connect(databaseUri, {useMongoClient: true});
mongoose.Promise = global.Promise;

app.use(express.static('public'));

// Add bodyParser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', routes);

// error handling middleware
app.use(function(err,req,res,next){
  res.status(422).send({error: err.message});
});

app.listen(port, function(){
  console.log("Now listening at port 4000 !")
})