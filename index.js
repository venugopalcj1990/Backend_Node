/* const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');

const app = express();

const connection = mysql.createConnection({
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

app.get('/', (req, res) => {
    res.send('Hello Welcome')
});

app.get('/selecttable', (req, res) => {
    const SQL = 'SELECT * FROM peraons';
    connection.query(SQL, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result)
        res.send(JSON.stringify(result))
    });
});

app.post('/peraons', (req, res) => {
    const { id, first_name, last_name, age } = req.query;
    const insert_data = `INSERT INTO peraons(person_id, first_name, last_name, age) VALUES (${id}, '${first_name}', '${last_name}', ${age})`;
    //const insert_data = `INSERT INTO peraons(person_id, first_name, last_name, age) VALUES (7, 'what', 'is', 47)`;
    connection.query(insert_data, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result)
        return res.send(JSON.stringify(result))
    });
});

/* let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});


pool.getConnection(function (err, connection) {
    connection.query('SELECT something FROM sometable', function (err, rows) {

        console.log(pool._freeConnections.indexOf(connection)); // -1

        connection.release();

        console.log(pool._freeConnections.indexOf(connection)); // 0

    });
});


app.listen(4000, () => {
    console.log("product is listening at 4000")
}); */

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

    res.sendFile(__dirname + '/index.html');

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

    var sql = "INSERT INTO `Persons`(`name`,`age`) VALUES ('" + req.body.name + "','" + req.body.age + "')";
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
    });
    //res.send(req);
});

//connection.end();

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});
