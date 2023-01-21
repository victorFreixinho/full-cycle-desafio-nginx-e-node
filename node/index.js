const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "nodedb",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const createTableSql = `CREATE TABLE IF NOT EXISTS nodedb.people(id int not null auto_increment, name varchar(255), primary key(id));`;
connection.query(createTableSql);

const insertSql = `INSERT INTO people(name) values('Victor');`;
connection.query(insertSql);

var namesList = "";

connection.query("SELECT name FROM people", function (error, results, fields) {
  if (error) throw error;
  results.forEach((r) => (namesList += "<li>" + r.name + "</li>"));
});

connection.end();

app.get("/", (req, res) => {
  res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
