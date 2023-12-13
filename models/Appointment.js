const mongoose = require("mongoose")

const appointment = new mongoose.Schema({ //Para definir os campos e oq eles vão aceitar
    name: String,
    email: String,
    description: String,
    cpf: String,
    date: Date,
    time: String,
    finished: Boolean, //Para dizer se já terminou a consulta 
    notified: Boolean //Para dixer o email já foi enviado
})

module.exports = appointment