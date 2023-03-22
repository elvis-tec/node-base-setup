const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Express server
const app = express();

//DB
dbConnection();

//CORS

// Use the following code to whitelist sites.
/*
const whitelist = ['https://www.example.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
*/
app.use(cors());

//Public route
app.use( express.static('public') );

//Body parser
app.use( express.json() );

//Routes
app.use('/api/auth', require('./routes/auth'));

//Listening
app.listen( process.env.PORT, ()=>{
	console.log('server: ', process.env.PORT);
});
