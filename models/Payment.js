const connection = require('../config/dbConfig')

const PaymentModel = function (model) {
    this.payment_id = model.payment_id
    this.amount = model.amount
    this. paymentDate= model.paymentDate
    this.paymentMethod = model.paymentMethod
}

PaymentModel.getAll = result => {
    connection.query("SELECT * FROM payment", (err, resp) => {
        if (err) {
            console.error("error getting all payments", err)
            result(err, null)
            return;
        }
        result(null, resp)
    })
}

PaymentModel.save = () => {
    if (this.paymentId) {
        connection.query("UPDATE payment SET ? WHERE paymentId = ?", [this, this.paymentId], (err, res) => {
            if (err) {
                throw ("Can not save payment error", err)
            }
        });
    } else {
        connection.query("INSERT INTO payment SET ?", this, (err, res) => {
            if (err) {
                throw ("Can not save payment error", err)
            }
            this.paymentId
        });
    }

};
PaymentModel.getByID = (id) => {
    connection.query(`SELECT * FROM payment where paymentId = '${id}'`, (err, resp) => {
        if (err) {
            throw ("can not get data", err)
        }
        if (resp.length) {
            // console.log("Users objects:", resp[0]);
            return new PaymentModel(resp[0])
        }
        return null
    })
}
PaymentModel.delete = () => {
    connection.query("DELETE FROM Admin WHERE paymentId = ?", this.id, (err, res) => {
        if (err) {
            throw ("can not delete data", err)
        }
    });
};
// method to send data to the front end
PaymentModel.toJson = () => {
    return {
        "paymentId": this.paymentId,
        "amount": this.amount,
        "payment_date": this.paymentDate,
        "payment_method": this.paymentMethod,
    }
}

module.exports = PaymentModel;