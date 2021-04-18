// Write your "projects" router here!

const express = require("express")
const projects = require("./projects-model")
const {validateID, validatePost} = require("../middleware/middleware")

const router = express.Router()


router.get("/api/projects", (req, res, next) => {
  projects.get()
    .then(project => {
      res.json(project)
    })
    .catch(next)
  })


router.get("/api/projects/:id", validateID(), (req, res) => {
  res.json(req.project)
})


router.post("/api/projects", validatePost(), (req, res, next) => {
  projects.insert(req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})


router.put("/api/projects/:id", validateID(), validatePost(), (req, res, next) => {
  projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})


router.delete("/api/projects/:id", validateID(), (req, res, next) => {
  projects.remove(req.params.id)
    .then(() => {
      res.status(200).json({message: "The project has successfully been deleted"})
    })
    .catch(next)
})

module.exports = router