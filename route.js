const express = require("express")
const fs = require("fs")
const update = require("./middlewares/update")
const router = express.Router()


router.get("/", (req, res)=>{
    res.render("index")
})

router.get("/data", (req, res)=>{
    fs.readFile("./tasks/tasks.json", (err, data)=>{
        if (err) throw err
        res.send(JSON.stringify(data.toString()))
    })
})

router.post("/", (req, res)=>{
    const rcv = req.body
    update(req.body.data)
    res.send(JSON.stringify(rcv))
})

module.exports = router