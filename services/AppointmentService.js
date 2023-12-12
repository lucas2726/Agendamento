const appointment = require("../models/Appointment")
const mongoose = require("mongoose")

const Appo = mongoose.model("Appointment", appointment) //Para dizer o nome da collection

class AppointmentService {

    async Create(name, email, description, cpf, date, time) {
        let newAppo = new Appo({//Para o js pegar o nome da propriedade para a let
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false
        })
        try{//Sempre que trabalhar com await deve se trabalhar o tryCatch
            await newAppo.save()//Para criar a collection
            return true
        } catch(err){//Sempre printar o err no tryCatch
            console.log(err)
            return false
        }

    }

}

module.exports = new AppointmentService()