const connection = require('../config/dbConfig')

const SalonModel = function (model, options) {
    this.SalonId = model.SalonId
    this.name = model.Name
    this.location = model.Location
    this.email = model.Email
    this.listHairdressers = model.listHairdressers
}

SalonModel.getAll = result => {
    connection.query("SELECT * FROM salon", (err, resp) => {
        if (err) {
            console.error("error getting all salons", err)
            result(err, null)
            return;
        }
        result(null, resp)
    })
}

SalonModel.save = () => {
    if (this.salonId) {
        connection.query("UPDATE salons SET ? WHERE salonId = ?", [this, this.salonId], (err, res) => {
            if (err) {
                throw ("Can not save salon error", err)
            }
        });
    } else {
        connection.query("INSERT INTO salons SET ?", this, (err, res) => {
            if (err) {
                throw ("Can not save salon error", err)
            }
            this.salonId
        });
    }

};
SalonModel.getByID = (id) => {
    connection.query(`SELECT * FROM salons where salonId = '${id}'`, (err, resp) => {
        if (err) {
            throw ("can not get data", err)
        }
        if (resp.length) {
            // console.log("Users objects:", resp[0]);
            return new SalonModel(resp[0])
        }
        return null
    })
}
SalonModel.delete = () => {
    connection.query("DELETE FROM Admin WHERE salonId = ?", this.id, (err, res) => {
        if (err) {
            throw ("can not delete data", err)
        }
    });
};
SalonModel.getByEmail = (email) => {
    connection.query(`SELECT * FROM salons where email = '${email}'`, (err, resp) => {
        if (err) {
            throw ("can not get data", err)
        }
        if (resp.length) {
            // console.log("Users objects:", resp[0]);
            return new SalonModel(resp[0])
        }
        return null
    })
}
// method to send data to the front end
SalonModel.toJson = () => {
    return {
        "salonId": this.salonId,
        "name": this.name,
        "Location": this.location,
        "Email": this.email,
        "listHairdressers": this.listHairdressers,
    }
}

module.exports = SalonModel;