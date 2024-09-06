const UserModel = require("../models/User");


exports.getAll = (req, res) => {
    try {
        res.status(200).send({
            users: UserModel.getAll()
        });
    } catch (error) {
        res.status(401).send({
            message: `Some thing went wrong check you internet connection`
        });
    }
};