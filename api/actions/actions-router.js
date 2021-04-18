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



module.exports = router