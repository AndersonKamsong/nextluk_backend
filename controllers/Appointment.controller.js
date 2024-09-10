const AppointmentModel = require("../models/Appointment");


exports.getAll = (req, res) => {
    try {
        res.status(200).send({
            appointment: AppointmentModel.getAll()
        });
    } catch (error) {
        res.status(401).send({
            message: `Some thing went wrong check you internet connection`
        });
    }
};