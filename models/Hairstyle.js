const connection = require('../config/dbConfig')

const HairstyleModel = function (model) {
    this.hairstyle_id = model.hairstyle_id
    this.name = model.name
    this.description = model.description
    this.image = model.image
}

HairstyleModel.getAll = result => {
    connection.query("SELECT * FROM hairstyle", (err, resp) => {
        if (err) {
            console.error("error getting all hairstyles", err)
            result(err, null)
            return;
        }
        result(null, resp)
    })
}

HairstyleModel.save = () => {
    if (this.hairstyle_id) {
        connection.query("UPDATE hairstyle SET ? WHERE hairstyleId = ?", [this, this.hairstyle_id], (err, res) => {
            if (err) {
                throw ("Can not save hairstyle error", err)
            }
        });
    } else {
        connection.query("INSERT INTO hairstyle SET ?", this, (err, res) => {
            if (err) {
                throw ("Can not save hairstyle error", err)
            }
            this.hairstyle_id
        });
    }

};
HairstyleModel.getByID = (id) => {
    connection.query(`SELECT * FROM hairstyle where hairstyleId = '${id}'`, (err, resp) => {
        if (err) {
            throw ("can not get data", err)
        }
        if (resp.length) {
            // console.log("Users objects:", resp[0]);
            return new HairstyleModel(resp[0])
        }
        return null
    })
}
HairstyleModel.delete = () => {
    connection.query("DELETE FROM Admin WHERE hairstyleId = ?", this.id, (err, res) => {
        if (err) {
            throw ("can not delete data", err)
        }
    });
};

// method to send data to the front end
HairstyleModel.toJson = () => {
    return {
        "hairstyleId": this.hairstyle_id,
        "name": this.name,
        "description": this.description,
        "image": this.image,
    }
}

module.exports = HairstyleModel;