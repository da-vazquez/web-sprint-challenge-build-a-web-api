// Write your "projects" router here!

const express = require("express")
const projects = require("./projects-model")
const {validateProjectID, validateProjectPost} = require("../middleware/middleware")

const router = express.Router()


router.get("/api/projects", (req, res, next) => {
  projects.get()
    .then(project => {
      res.json(project)
    })
    .catch(next)
  })


router.get("/api/projects/:id", validateProjectID(), (req, res) => {
  res.json(req.project)
})


router.post("/api/projects", validateProjectPost(), (req, res, next) => {
  projects.insert(req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})


router.put("/api/projects/:id", validateProjectID(), validateProjectPost(), (req, res, next) => {
  projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})


router.delete("/api/projects/:id", validateProjectID(), (req, res, next) => {
  projects.remove(req.params.id)
    .then(() => {
      res.status(200).json({message: "The project has successfully been deleted"})
    })
    .catch(next)
})


router.get("/api/projects/:id/actions", validateProjectID(), (req, res) => {
  projects.getProjectActions(req.project.id)
    res.json(req.project)

})



module.exports = router