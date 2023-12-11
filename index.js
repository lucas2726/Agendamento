const bodyParser = require("body-parser")
const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

mongoose.connect("mongodb://127.0.0.1:27017/agendamento")

app.set("/", (req, res) => {
    res.send("oi!")
})

app.get("/cadastro", (req, res) => {
    res.render("create")
})

app.listen(8080, () => {
    console.log("Servidor rodando!")
})