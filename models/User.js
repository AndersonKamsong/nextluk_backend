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
    try {
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
    } catch (error) {
        throw ("Can not save user error", err)
    }

};
UserModel.getAll = async () => {
    try {
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
    } catch (error) {
        throw ("Can not save user error", err)
    }

};
UserModel.getByID = async (id) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users where userId = '${id}'`, async (err, resp) => {
                if (err) {
                    reject("can not get data", err);
                }
                if (resp.length) {
                    // console.log("Users objects:", resp[0]);
                    // console.log("Users objects:", new UserModel(resp[0]));
                    resolve(new UserModel(resp[0]));
                } else {
                    resolve(null);
                }
            });
        });
    } catch (error) {
        throw ("Can not save user error", err)
    }
}
UserModel.prototype.delete = async function () {
    console.log(this);
    try {
        connection.query(`DELETE FROM users WHERE userId = ${this.Id}`, (err, res) => {
            if (err) {
                throw ("can not delete data", err)
            }
        });
    } catch (error) {
        throw ("can not delete data", err)
    }
};
UserModel.getByEmail = async (email) => {
    try {
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
    } catch (error) {
        throw ("Can not save user error", err)
    }
}
UserModel.getByUname = async (name) => {
    try {
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
    } catch (error) {
        throw ("Can not save user error", err)
    }
}
UserModel.prototype.toJson = function () {
    try {
        return {
            userId: this.userId,
            username: this.username,
            email: this.email,
        };
    } catch (error) {
        throw ("Can not save user error", err)
    }
};

module.exports = UserModel;