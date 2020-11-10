// New code
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const cors = require("cors");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'

});

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.use(cors());


app.get('/', function (req, res) {

    //res.sendFile(__dirname + '/index.html');
    const SQL = 'SELECT * FROM person';
    connection.query(SQL, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(JSON.stringify(result))
    });

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});


app.post('/data', function (req, res) {
    console.log(req);

    /* var sql = "INSERT INTO `Persons`(`name`,`age`) VALUES ('" + req.body.name + "','" + req.body.age + "')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        const SQL = 'SELECT * FROM persons';
        connection.query(SQL, (err, result) => {
            if (err) {
                throw err;
            }
            console.log(result)
            res.send(JSON.stringify(result))
        });
    }); */

    var sql = "INSERT INTO `Person`(`person_id`,`first_name`, `last_name`, `age`) VALUES ('" + req.body.id + "','" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.age + "')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        const SQL = 'SELECT * FROM person';
        connection.query(SQL, (err, result) => {
            if (err) {
                res.send(err);
            }
            console.log(result)
            res.send(JSON.stringify(result))
        });
    });
    //res.send(req);
});

//connection.end();

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});
