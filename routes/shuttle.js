const express = require('express');
const router = express.Router();
const path = require("path");

router.get('/', (req,res) => {
    res.send('Home page')
})

router.get('/worktrips',(req,res)=> {
    res.send('Work Shuttle')
})

router.get('/grocerytrips', (req,res)=> {
    res.send('Grocery trips')
})

router.get('/pingshuttle', (req,res)=> {
    res.send('Shuttle location')
})


module.exports = router;