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


// WORK TRIPS
// Add users to work trips list
async function addUser(name, location) {
  await prisma.worktrips.create({
    data: {
      name: name,
      location: location
    }
  })
  return 'Added to list'
}
// Get info from work trips table
async function getWorkTrips() {
  const allUsers = await prisma.worktrips.findMany();
  return allUsers;
}

router
  .route('/')
  .get((req,res) => {
        res.send('Home page')
        getWorkTrips()
        .then((data)=> {
          return {
            name: data.name,
            location: data.location
          }
        })
  })

router
  .route('/worktrips')
  .get((req,res)=> {
    res.send('Work Shuttle')
  })
  .post((req,res) => {
    let userName = req.body.name
    let userLocation = req.body.location
    addUser(userName, userLocation)
  .then(async(data)=> {
    res.send(data)
    console.log(data);
    await prisma.$disconnect();
  })
  .catch(async(e)=> {
    res.send('Error. User not added to trip')
    console.log(e);
    await prisma.$disconnect();
  })
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
    res.send('Location unknown')
  })    


  router
    .route('/driverlocation')
    .post((req,res)=> {
      driverLocation = req.body;
      lastUpdated = new Date().toLocaleString();
      res.send('Driver location updated')
    })

module.exports = router;