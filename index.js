const bodyParser = require("body-parser")
const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const AppointmentService = require("./services/AppointmentService")
const appointment = require("./models/Appointment")

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

mongoose.connect("mongodb://127.0.0.1:27017/agendamento")

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/cadastro", (req, res) => {
    res.render("create")
})

app.post("/create", async (req, res) => {

    let status = await AppointmentService.Create(
        req.body.name,
        req.body.email,
        req.body.description,
        req.body.cpf,
        req.body.date,
        req.body.time
    )
    if (status) {
        res.redirect("/")
    } else {
        res.send("Ocorreu um erro!")
    }

})

app.get("/getcalendar", async (req, res) => {
    let appointments = await AppointmentService.GetAll(false)
    res.json(appointments)
})

app.listen(8080, () => {
    console.log("Servidor rodando!")
})