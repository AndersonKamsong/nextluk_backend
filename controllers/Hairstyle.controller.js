const HairstyleModel = require("../models/Hairstyle");


exports.getAll = (req, res) => {
    try {
        res.status(200).send({
            hairstyle: HairstyleModel.getAll()
        });
    } catch (error) {
        res.status(401).send({
            message: `Some thing went wrong check you internet connection`
        });
    }
};