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
            finished: false,
            notified: false
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
    }
        /*
1-if (showFinished) { return await Appo.find() }: Se showFinished for verdadeiro, o método retornará todas as consultas na coleção Appo.

2-let appos = await Appo.find({ 'finished': false }): Se showFinished for falso, o método buscará todas as consultas na coleção Appo onde o campo finished é falso. Ou seja, ele busca todas as consultas que ainda não foram finalizadas.

3-appos.forEach(appointment => { if (appointment.date != undefined) { appointments.push(AppointmentFactory.Build(appointment)) } }): Este é um loop que percorre todas as consultas não finalizadas. Se a consulta tiver uma data definida, ela será construída usando a AppointmentFactory e adicionada à lista de appointments.

4-return appointments: Por fim, o método retorna a lista de consultas não finalizadas que têm uma data definida.
*/

    

async GetbyId(id){
    try {
        let event = await Appo.findOne({'_id': id})
        return event
    } catch(error){
        console.log(error)
    }
}

async Finish(id){
    try {
     await Appo.findByIdAndUpdate(id, {finished: true})
     return true   
    } catch (error) {
        console.log(error)
        return false //È importante dar o return false true para saber se operação foi concluida
    }
}

async Search(query){
    try {
        let appos = await Appo.find().or([{email: query}, {cpf: query}])
        return appos
    } catch (error) {
        console.log(error)
        return []
    }
}

async sendNotification(){
    let appos = await this.GetAll(false)
    console.log(appos)
}

}

module.exports = new AppointmentService()