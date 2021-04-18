const express = require('express');
const server = express();
const {logger} = require("./middleware/middleware")
const projectRouter = require("./projects/projects-router")

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json())
server.use(logger())



server.get('/api/test', (req, res) => {
  res.status(200).json({
		hello: `Welcome to the web api sprint challenge`,
		
	})
})


module.exports = server;
