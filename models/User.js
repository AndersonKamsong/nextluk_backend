const connection = require('../config/dbConfig')

const UserModel = function (model) {
    this.userId = model.userId
    this.name = model.name
    this.email = model.email
    this.token = model.token
    this.password = model.password
    this.passwordString = model.passwordString

    // this.password_confirmation = model.password_confirmation  // password confirmation is niot store
}

UserModel.save = () => {
    if (this.userId) {
        connection.query("UPDATE users SET ? WHERE userId = ?", [this, this.userId], (err, res) => {
            if (err) {
                throw ("Can not save user error", err)
            }
        });
    } else {
        connection.query("INSERT INTO users SET ?", this, (err, res) => {
            if (err) {
                throw ("Can not save user error", err)
            }
            this.userId
        });
    }

};

UserModel.getAll = () => {
    connection.query("SELECT * FROM users", (err, resp) => {
        if (err) {
            throw ("can not get data", err)
        }
        const userList = resp.map(row => new UserModel(row).toJson());
        console.log("Users objects:", userList);
        return userList
    })
}
UserModel.getByID = (id) => {
    connection.query(`SELECT * FROM users where userId = '${id}'`, (err, resp) => {
        if (err) {
            throw ("can not get data", err)
        }
        if (resp.length) {
            // console.log("Users objects:", resp[0]);
            return new UserModel(resp[0])
        }
        return null
    })
}
UserModel.delete = () => {
    connection.query("DELETE FROM Admin WHERE userId = ?", this.id, (err, res) => {
        if (err) {
            throw ("can not delete data", err)
        }
    });
};
UserModel.getByEmail = (email) => {
    connection.query(`SELECT * FROM users where email = '${email}'`, (err, resp) => {
        if (err) {
            throw ("can not get data", err)
        }
        if (resp.length) {
            // console.log("Users objects:", resp[0]);
            return new UserModel(resp[0])
        }
        return null
    })
}
// method to send data to the front end
UserModel.toJson = () => {
    return {
        "userId": this.userId,
        "password": this.password,
        "name": this.name,
        "email": this.email,
    }
}

module.exports = UserModel;