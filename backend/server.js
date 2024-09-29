const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter = require('./routes/userRoutes.js')
const contactRouter = require('./routes/contactRoutes.js')
//SCHEMA
const User = require('./models/userSchema.js')
const port = process.env.PORT || 3001;


// Connect to express app
const app = express()

// Connect to MongoDB
const dbconnectionString = process.env.dbURI

mongoose 
.connect(dbconnectionString)
.then(() => {
    app.listen(port, () => { 
        console.log(`Server is connected to Port ${port} and connected to MongoDB`)
    })
})
.catch((error) => {
   console.log('Unable to connect to Server and/or MongoDB')
})
 

//Middlewares
app.use(bodyParser.json()) 
app.use(cors(
    {
        origin: "https://auth-user-contact-project.vercel.app/",
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));

app.use(userRouter)
app.use(contactRouter)


//Routes

// User Registration
// POST Registration

// app.post('/register', )

 
//GET REgistered Users
// app.get('/register', )


//Post to Get User Login
// app.post('/login', )

// C - POST Request
// R - GET Request
// U - PUT or PATCH Request
// D - DELETE Request