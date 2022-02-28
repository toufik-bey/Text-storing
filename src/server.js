const express = require('express');
const app = express();
const connectDB = require('./db/Database'); 

// Body parser
app.use(express.json()); 

// connect the database 
connectDB();




// config the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});