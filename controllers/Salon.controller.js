const SalonModel = require("../models/Salon");


exports.getAll = (req, res) => {
    try {
        res.status(200).send({
            salon: SalonModel.getAll()
        });
    } catch (error) {
        res.status(401).send({
            message: `Some thing went wrong check you internet connection`
        });
    }
};