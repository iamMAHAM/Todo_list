const express = require("express")
const fs = require("fs")
const path = require("path")
const routes = require("./route")
const app = express()


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.get("/", routes)

app.listen(3000, ()=>console.log("server started"))