const express = require("express")
const config  = require("./config.json")
const bodyParser  = require("body-parser")
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.locals.layout = false
app.use("/",                require("./routes/index"))
app.use("/api",             require("./routes/api"))
/* Listening on the port specified in the config.json file. */
app.listen(config.servicePort,function(){
    console.log(`Now listening on ${config.servicePort}`)
})
