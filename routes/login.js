const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require("path");


const prisma = new PrismaClient();

async function verifyUser(email,password) {
    const allUsers = await prisma.users.findMany({
        where: {
            email:{
                equals: email
            },
            password:{
                equals: password
            }
        }
    });
    return allUsers;
  }
  
router.get('/', (req,res)=> {
    res.send('Login page')
})

router.post('/', (req,res) => {
    let email = req.body.email
    let password = req.body.password
    verifyUser(email,password)
    .then(async (data) => {
      if (data.length === 1) {
        res.send(data)
      } else {
        res.send('Invalid credentials')
      }
      console.log(data);
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      res.send('Connection error')
      await prisma.$disconnect()
    //   process.exit(1)
    })
})

module.exports = router;