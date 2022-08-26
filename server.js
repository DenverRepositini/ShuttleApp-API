require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT

app.use(cors());
app.use(express.json()); //response formatted as JSON

const loginRoute = require('./routes/login')
const signupRoute = require('./routes/signup')
const shuttleRoute = require('./routes/shuttle')

app.use('/login', loginRoute)
app.use('/signup', signupRoute)
app.use('/shuttle', shuttleRoute)


// start Express on port 8080
app.listen(PORT, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});