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

app.get("/event/:id", async (req, res) => {
    let appointment = await AppointmentService.GetbyId(req.params.id)
    console.log(appointment)
   res.render("event", {appo: appointment})
})

app.post("/finish", async (req, res) => {
    let id = req.body.id
    let result = await AppointmentService.Finish(id)
    res.redirect("/")
})

app.get("/list", async (req, res) => {
    let appos = await AppointmentService.GetAll(true)
    res.render("list", {appos})
})

app.get("/searchresult", async (req, res) => {
    let appos = await AppointmentService.Search(req.query.search)
    res.render("list", {appos})
})

let polltime = 5000
setInterval(async () => {
 await AppointmentService.sendNotification()

},polltime)

app.listen(8080, () => {
    console.log("Servidor rodando!")
})