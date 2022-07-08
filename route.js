const express = require("express")
const fs = require("fs")
const router = express.Router()


router.get("/", (req, res)=>{
    res.render("index")
})

router.post("/", (req, res)=>{
    console.log(req.body)
    res.send("cool")
})

module.exports = router