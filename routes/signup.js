const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require("path");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createUser(name,email,location,password) {
    await prisma.users.create({
      data: {
        name: name,
        email: email,
        location: location,
        password: password
      },
    })
  
    // const allUsers = await prisma.user.findMany();
    // console.dir(allUsers, { depth: null })
    // return allUsers;
    return 'Signup Successful'
  }

router.get('/', (req,res) => {
    res.send('Signup page')
})

router.post('/', (req,res)=> {
    createUser(req.body.name,req.body.email,req.body.location,req.body.password)
    .then(async (data) => {
      console.log(data);
      res.send(data)
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      res.send('Error Signup unsuccessful')
      console.error(e)
      await prisma.$disconnect()
    //   process.exit(1)
    })
})




module.exports = router;