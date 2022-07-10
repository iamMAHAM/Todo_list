const express = require("express")
const fs = require("fs")
const path = require("path")
const update = require("./middlewares/update")
const router = express.Router()


router.get("/", (req, res)=>{
    res.render("index")
})

router.post("/", (req, res)=>{
    console.log(req.body)
    const rcv = req.body
    update(req.body.data)
    res.send(JSON.stringify(req.body))
    
})

module.exports = router