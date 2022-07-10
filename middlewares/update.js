const fs = require("fs")

const update = (data={})=>{
    fs.writeFile("./tasks/tasks.json", JSON.stringify(data, null, 4), (err)=>{
        if (err) throw err
    })
}

module.exports = update