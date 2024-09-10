const PaymentModel = require("../models/Payment");


exports.getAll = (req, res) => {
    try {
        res.status(200).send({
            payment: PaymentModel.getAll()
        });
    } catch (error) {
        res.status(401).send({
            message: `Some thing went wrong check you internet connection`
        });
    }
};