class AppointmentFactory {

    Build(simpleAppointment) {
        let day = simpleAppointment.date.getDate() + 1
        let month = simpleAppointment.date.getMonth()
        let year = simpleAppointment.date.getFullYear()
        let hour = Number.parseInt(simpleAppointment.time.split(":")[0])
        let minutes = Number.parseInt(simpleAppointment.time.split(":")[1])

        let startDate = new Date(year, month, day, hour, minutes, 0, 0)

        let appo = {
            id: simpleAppointment._id,
            title: simpleAppointment.name + " - " + simpleAppointment.description,
            start: startDate,
            end: startDate
        }
        return appo
        /*
        Este é um método chamado Build, que recebe um parâmetro simpleAppointment. Este método é provavelmente usado para construir um objeto de compromisso (ou “appo”) a partir de um compromisso simples.

let day = simpleAppointment.date.getDate() + 1; let month = simpleAppointment.date.getMonth(); let year = simpleAppointment.date.getFullYear(); let hour = Number.parseInt(simpleAppointment.time.split(":")[0]); let minutes = Number.parseInt(simpleAppointment.time.split(":")[1]);: Essas linhas estão extraindo o dia, mês, ano, hora e minutos do simpleAppointment.

let startDate = new Date(year, month, day, hour, minutes, 0, 0); startDate.setHours(startDate.getHours() - 3);: Essas linhas estão criando um novo objeto Date chamado startDate com o ano, mês, dia, hora e minutos extraídos. 

let appo = { id: simpleAppointment._id, title: simpleAppointment.name + " - " + simpleAppointment.description, start: startDate, end: startDate }; return appo;: Essas linhas estão criando um novo objeto appo com um id, title, start e end. O title é uma combinação do nome e descrição do simpleAppointment. Tanto o start quanto o end são o startDate ajustado.
        */
    }

}

module.exports = new AppointmentFactory