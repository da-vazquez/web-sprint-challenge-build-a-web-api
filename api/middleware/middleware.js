const projects = require("../projects/projects-model")

function logger() {
  return (req, res, next) => {
    const time = new Date().toISOString()

    console.log(`${req.ip} made a ${req.method} request to ${req.url} at ${time}`)
      
    
  next()
}
}

function validateID() {
  return (req, res, next) => {
    projects.get(req.params.id)
      .then((project) => {
        if (project) {
          req.project = project
          next()
      } else {
        res.status(404).json({message: "A project with the specified ID could not be located"})
      }
    })
    .catch((error) => {
      next(error)
    })
  }
}


function validatePost() {
  return (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      return res.status(400).json({message: "Missing name and/or description for project"})
    }
      next()
  }
}



module.exports = {logger, validateID, validatePost}