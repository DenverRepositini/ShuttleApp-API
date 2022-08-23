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
async function addUser(name, location, time ) {
  await prisma.worktrips.create({
    data: {
      name: name,
      time: time,
      location: location
    }
  })
  return 'Added to list'
}
// Get info from work trips table
async function getWorkTrips() {
  const allUsers = await prisma.worktrips.findMany({
    orderBy: {
      time: 'asc'
    }
  });
  return allUsers;
}


// GROCERY TRIPS------------------------------------------------------------
// Add users to list
async function addUserGrocery(name,location,) {
  await prisma.grocerytrips.create({
    data: {
      name: name,
      location: location
    }
  })
  return 'Added to list'
}
// Get info from grocery trips table
async function getGroceryTrips() {
  const allUsers = await prisma.grocerytrips.findMany();
  return allUsers;
}

// Delete user from trip list 
async function deleteUserGrocery(id) {
  const deleteUser = await prisma.grocerytrips.delete({
    where: {
      id: id
    }
  })
  return deleteUser;
}

//-------------------------------------------------------------------------
router
  .route('/')
  .get((req,res) => {
        res.send('Home page')
  })

  // -------------------------------------------------------
      // WORK TRIPS
  router
  .route('/worktrips')
  .get((req,res)=> {
    getWorkTrips()
    .then((data)=> {
      console.log(data);
      res.send(data)
    })
  })
  .post((req,res) => {
    let userName = req.body.name
    let time = req.body.time
    let userLocation = req.body.location
    addUser(userName, userLocation, time)
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
  
  // -------------------------------------------------------
    // GROCERY TRIPS
router
  .route('/grocerytrips')
  .get((req,res)=> {
    getGroceryTrips()
    .then((data)=> {
      console.log(data);
      res.send(data)
    })
  })
  .post((req,res) => {
    let userName = req.body.name
    let userLocation = req.body.location
    addUserGrocery(userName, userLocation)
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
  // -----DELETE POST---------------------
  router.route('/grocerytrips/:id')
  .delete((req,res) => {
        let userId = req.params.id
        deleteUserGrocery(userId)
        .then(async(data)=> {
          res.send(data)
          await prisma.$disconnect();
        })
        .catch(async(e)=> {
          res.send('Error. Could not delete user')
          console.log(e);
          await prisma.$disconnect();
        })
      }
  )

  // ----------------------------------------------------------------------
  // PING SHUTTLE 
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

  // -------------------------------------------------------
  // DRIVER LOCATION INPUT
  router
    .route('/driverlocation')
    .post((req,res)=> {
      driverLocation = req.body;
      lastUpdated = new Date().toLocaleString();
      res.send('Driver location updated')
    })

module.exports = router;