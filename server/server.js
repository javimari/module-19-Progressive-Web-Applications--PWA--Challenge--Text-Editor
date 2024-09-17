// Import the Express module
const express = require('express');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;  // Define the port to listen on

// Serve static files from the 'client/dist' directory
app.use(express.static('../client/dist'));

// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and apply HTML routes
require('./routes/htmlRoutes')(app);

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`);
});
