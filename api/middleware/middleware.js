const projects = require("../projects/projects-model")

function logger() {
  return (req, res, next) => {
    const time = new Date().toISOString()

    console.log(`${req.ip} made a ${req.method} request to ${req.url} at ${time}`)
      
    
  next()
}
}

function validateID() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    projects.get(req.params.id)
      .then((project) => {
        if (project) {
          req.project = project
          next()
      } else {
        res.status(404).json({message: "A project with that ID could not be located"})
      }
    })
    .catch((error) => {
      next(error)
    })
  }
}



module.exports = {logger, validateID}