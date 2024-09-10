const connection = require('../config/dbConfig')
const uuid = require('uuid');

const UserModel = function (model) {
    this.userId = model.userId
    this.username = model.username
    this.email = model.email
    this.password = model.password
    this.userType = model.userType
    this.token = model.token

    // this.password_confirmation = model.password_confirmation  // password confirmation is niot store
}

UserModel.prototype.save = async function () {
    if (this.userId) {
        await connection.query("UPDATE users SET ? WHERE userId = ?", [this, this.userId], (err, res) => {
            if (err) {
                throw ("Can not save user error", err)
            }
        });
    } else {
        this.token = null
        console.log(this);
        await connection.query("INSERT INTO users SET ?", this, (err, res) => {
            if (err) {
                throw ("Can not save user error", err)
            }
            this.userId = res.insertId;
            console.log(this.userId);
        });
    }

};
UserModel.getAll = async () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users`, async (err, resp) => {
            if (err) {
                reject("can not get data", err);
            }
            if (resp.length) {
                console.log("Users objects:", resp[0]);
                console.log(new UserModel(resp[0]));
                const userList = resp.map(row => new UserModel(row).toJson());
                resolve(userList);
            } else {
                resolve([]);
            }
        });
    });
};
UserModel.getByID = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users where userId = '${id}'`, async (err, resp) => {
            if (err) {
                reject("can not get data", err);
            }
            if (resp.length) {
                console.log("Users objects:", resp[0]);
                console.log("Users objects:", new UserModel(resp[0]));
                resolve(new UserModel(resp[0]));
            } else {
                resolve(null);
            }
        });
    });
}
UserModel.delete = () => {
    connection.query("DELETE FROM Admin WHERE userId = ?", this.id, (err, res) => {
        if (err) {
            throw ("can not delete data", err)
        }
    });
};
UserModel.getByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users where email = '${email}'`, async (err, resp) => {
            if (err) {
                reject("can not get data", err);
            }
            if (resp.length) {
                console.log("Users objects:", resp[0]);
                console.log("Users objects:", new UserModel(resp[0]));
                resolve(new UserModel(resp[0]));
            } else {
                resolve(null);
            }
        });
    });
}
UserModel.getByUname = async (name) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users where username = '${name}'`, async (err, resp) => {
            if (err) {
                reject("can not get data", err);
            }
            if (resp.length) {
                console.log("Users objects:", resp[0]);
                console.log("Users objects:", new UserModel(resp[0]));
                resolve(new UserModel(resp[0]));
            } else {
                resolve(null);
            }
        });
    });
}
UserModel.prototype.toJson = function () {
    return {
        userId: this.userId,
        username: this.username,
        email: this.email,
    };
};

module.exports = UserModel;