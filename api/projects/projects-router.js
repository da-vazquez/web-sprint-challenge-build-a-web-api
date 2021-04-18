// Write your "projects" router here!

const express = require("express")
const projects = require("./projects-model")
const {validateID} = require("../middleware/middleware")

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


module.exports = router