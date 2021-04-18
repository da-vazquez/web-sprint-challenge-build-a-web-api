// Write your "actions" router here!

const express = require("express")
const actions = require("./actions-model")
const {validateActionID, validateActionPost} = require("../middleware/middleware")

const router = express.Router()


router.get("/api/actions", (req, res, next) => {
  actions.get()
    .then(project => {
      res.json(project)
    })
    .catch(next)
})


router.get("/api/actions/:id", validateActionID(), (req, res) => {
  res.json(req.action)
})


router.post("/api/actions", validateActionPost(), (req, res, next) => {
  actions.insert(req.body)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(next)
})  


router.put("/api/actions/:id", validateActionID(), validateActionPost(), (req, res, next) => {
  actions.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(next)
})


router.delete("/api/actions/:id", validateActionID(), (req, res, next) => {
  actions.remove(req.params.id)
    .then(() => {
      res.status(200).json({message: "The action has successfully been deleted"})
    })
    .catch(next)
})


module.exports = router