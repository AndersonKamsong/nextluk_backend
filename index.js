const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

require('dotenv').config()
const connection = require('./config/dbConfig')

connection.getConnection((err, connection) => {
    if (err) {
        console.error(err, "error getting connection")
    } else {
        console.log("connected to database");
    }
});
let app = express();
let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.json({ "message": "welcome to the nextluk backend!" });
});
const routes = require('./routers/index')
app.use("/api", routes)
app.use("*", (req, res) => {
    res.json({ "message": "Not Found" });
});
var server = app.listen(5000, function () {
    var port = server.address().port
    console.log("Your app is listening on localhost: " + port)
})