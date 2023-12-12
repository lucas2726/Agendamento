const appointment = require("../models/Appointment")
const mongoose = require("mongoose")
const AppointmentFactory = require("../factories/AppointmentFactory")

const Appo = mongoose.model("Appointment", appointment) //Para dizer o nome da collection

class AppointmentService {

    async Create(name, email, description, cpf, date, time) { //Para colocar no BD
        let newAppo = new Appo({//Para o js pegar o nome da propriedade para a let
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false
        })
        try {//Sempre que trabalhar com await deve se trabalhar o tryCatch
            await newAppo.save()//Para criar a collection
            return true
        } catch (err) {//Sempre printar o err no tryCatch
            console.log(err)
            return false
        }

    }

    async GetAll(showFinished) {
        if (showFinished) {
            return await Appo.find()
        } else {
            let appos = await Appo.find({ 'finished': false }) // Para pesquisar todas as consultas menos as finalizadas
            let appointments = []

            appos.forEach(appointment => {
                if (appointment.date != undefined) {
                    appointments.push(AppointmentFactory.Build(appointment))
                }
            })
            return appointments
        }
        /*
        Este é um método assíncrono chamado `GetAll`, que recebe um parâmetro `showFinished`. Este método é provavelmente usado para buscar todos os compromissos (ou "appos") de algum tipo de banco de dados.
        
        1. `if (showFinished) { return await Appo.find() }`: Se `showFinished` for verdadeiro, o método retorna todos os compromissos encontrados na coleção `Appo`.
        
        2. `let appos = await Appo.find({ 'finished': false })`: Se `showFinished` for falso, o método busca todos os compromissos que ainda não foram finalizados (ou seja, `'finished': false`).
        
        3. `appos.forEach(appointment => { if (appointment.date != undefined) { appointments.push(AppointmentFactory.Build(appointment)) } })`: Para cada compromisso não finalizado, se a data do compromisso estiver definida, o compromisso é construído usando `AppointmentFactory.Build(appointment)` e adicionado à lista `appointments`.
        
        4. `return appointments`: Finalmente, o método retorna a lista de compromissos não finalizados que têm uma data definida.
        */
    }
}

module.exports = new AppointmentService()