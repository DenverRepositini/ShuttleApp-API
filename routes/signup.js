const express = require('express')
const router = express.Router();
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

router
.route('/')
.get((req,res) => {
    res.send('Signup page')
})
.post((req,res)=> {
    let name =req.body.name
    let email = req.body.email
    let location = req.body.location
    let password = req.body.password
    createUser(name, email, location, password)
    .then(async (data) => {
      console.log(data);
      res.send(data)
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      res.send('Signup unsuccessful')
      console.error(e)
      await prisma.$disconnect()
    //   process.exit(1)
    })
})




module.exports = router;