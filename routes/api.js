const express = require('express');
const router = express.Router();
const Samurai = require('../models/samurai');

// Get samurais within 100 sq.km of coordinates (q?lng=<>&lat=<>) 
router.get('/samurais', (req,res, next) => {
  Samurai.aggregate([
    {
      $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
          },
          distanceField: "dist.calculated",
          maxDistance: 100000,
          spherical: true
      }
    }
  ]).then(function(samurais){
    res.send(samurais);
  });
});

// Create a samurai
router.post('/samurais', function(req, res, next){
  Samurai.create(req.body).then(function(samurai){
    res.send(samurai);
  }).catch(next);
});

// Update a samurai
router.put('/samurais/:id', function(req, res, next){
  Samurai.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Samurai.findOne({_id: req.params.id}).then(function(samurai){
      res.send(samurai);
    });
  });
});

// Delete a samurai
router.delete('/samurais/:id', function(req, res, next){
  Samurai.findByIdAndRemove({_id: req.params.id}).then(function(samurai){
    res.send(samurai);
  });
});

module.exports = router;