const projects = require("../projects/projects-model")
const actions = require("../actions/actions-model")

function logger() {
  return (req, res, next) => {
    const time = new Date().toISOString()

    console.log(`${req.ip} made a ${req.method} request to ${req.url} at ${time}`)
      
    
  next()
}
}

function validateProjectID() {
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


function validateActionID() {
  return (req, res, next) => {
    actions.get(req.params.id)
      .then((action) => {
        if (action) {
          req.action = action
          next()
      } else {
        res.status(404).json({message: "An action with the specified ID could not be located"})
      }
    })
    .catch((error) => {
      next(error)
    })
  }
}


function validateProjectPost() {
  return (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      return res.status(400).json({message: "Missing name and/or description for project"})
    }
      next()
  }
}


function validateActionPost() {
  return (req, res, next) => {
    if (!req.body.description || !req.body.notes || !req.body.project_id) {
      return res.status(400).json({message: "Missing description, notes and/or project_id for action"})
    }
      next()
  }
}


module.exports = {logger, validateProjectID, validateProjectPost, validateActionID, validateActionPost}