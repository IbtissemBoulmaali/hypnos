const express = require("express"),
  bodyparser = require("body-parser"),
  config = require("./server/config/default.json"),
  mysql = require("mysql"),
  port = process.env.PORT || config.port;

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

require("./server/cors")(app);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hypnosdb",
});

app.use("/connexion", require("./server/controllers/user"));
app.use("/etablissment", require("./server/controllers/etablissment"));

connection.connect((err) => {
  if (err) console.log("erreur de la connexion à la base de donnée");
  console.log("base de donnée connected");
  app.listen(port, () => {
    console.log("server tourne sur le port : ", port);
  });
});
