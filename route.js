const express = require("express")
const update = require("./middlewares/update")
const router = express.Router()


router.get("/", (req, res)=>{
    res.render("index")
})

router.post("/", (req, res)=>{
    const rcv = req.body
    update(req.body.data)
    res.send(JSON.stringify(rcv))
})

module.exports = router