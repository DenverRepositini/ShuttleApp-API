const express = require('express');
const router = express.Router();
const path = require("path");
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

// Google Maps api key
const mapsKey = 'AIzaSyB7iTcMNo0Ju4-JOzrIAkAFz5RIbgN1eM8';
const prisma = new PrismaClient();

var driverLocation = null;
var lastUpdated = null;

router
  .route('/')
  .get((req,res) => {
        res.send('Home page')
  })

router
  .route('/worktrips')
  .get((req,res)=> {
    res.send('Work Shuttle')
  })
  

router
  .route('/grocerytrips')
  .get((req,res)=> {
    res.send('Grocery trips')
  })

router
  .route('/pingshuttle')
  .get((req,res)=> {
    driverLocation?
    res.send({
      location: driverLocation,
      lastSeen: lastUpdated
    }):
    res.send('Location not found')
  })    


  router
    .route('/driverlocation')
    .post((req,res)=> {
      driverLocation = req.body;
      lastUpdated = new Date().toLocaleString();
      res.send('Driver location updated')
    })

module.exports = router;