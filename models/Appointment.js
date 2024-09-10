const connection = require('../config/dbConfig')

const AppointmentModel = function (model) {
    this.appointment_id = model.appointment_id
    this.date = model.date
    this.time = model.time
    this.isPaid = model.isPaid
    this.user_id = model.user_id 
    this.hairdresser_id = model.hairdresser_id 
    this.salon_id = model.salon_id 
}

AppointmentModel.getAll = result => {
    connection.query("SELECT * FROM appointment", (err, resp) => {
        if (err) {
            console.error("error getting all appointments", err)
            result(err, null)
            return;
        }
        result(null, resp)
    })
}
AppointmentModel.save = () => {
    if (this.appointment_id) {
        connection.query("UPDATE appointment SET ? WHERE appointmentId = ?", [this, this.appointment_id], (err, res) => {
            if (err) {
                throw ("Can not save appointment error", err)
            }
        });
    } else {
        connection.query("INSERT INTO appointment SET ?", this, (err, res) => {
            if (err) {
                throw ("Can not save appointment error", err)
            }
            this.appointment_id
        });
    }

};
AppointmentModel.getByID = (id) => {
    connection.query(`SELECT * FROM appointment where appointmentId = '${id}'`, (err, resp) => {
        if (err) {
            throw ("can not get data", err)
        }
        if (resp.length) {
            // console.log("Users objects:", resp[0]);
            return new AppointmentModel(resp[0])
        }
        return null
    })
}
AppointmentModel.delete = () => {
    connection.query("DELETE FROM Admin WHERE appointmentId = ?", this.id, (err, res) => {
        if (err) {
            throw ("can not delete data", err)
        }
    });
};

// method to send data to the front end
AppointmentModel.toJson = () => {
    return {
        "appointmentId": this.appointment_id,
        "date": this.date,
        "time": this.time,
        "isPaid": this.isPaid,
        "userId": this.user_id,
        "salonId": this.salon_id,
        "hairdresserId": this.hairdresser_id,
    }
}

module.exports = AppointmentModel;