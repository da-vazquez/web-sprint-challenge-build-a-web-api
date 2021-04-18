const express = require('express');
const server = express();
const {logger} = require("./middleware/middleware")
const projectRouter = require("./projects/projects-router")

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json())
server.use(logger())
server.use(projectRouter)


server.get('/api/test', (req, res) => {
  res.status(200).json({
		hello: `Welcome to the web api sprint challenge`,
		
	})
})

server.use((err, req, res, next) => {
  console.log(err)

  res.status(500).json({message: "Something went wrong..."})

})

module.exports = server;
