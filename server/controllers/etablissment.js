const express = require("express"),
  mysql = require("mysql"),
  config = require("../config/default.json"),
  auth = require("../middleware/auth");
Router = express.Router();

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hypnosdb",
});

/****************************add etablissment ......................*/

Router.post("/add", auth, function (req, res) {
  let { nom, adresse, description, ville } = req.query;

  if (!(nom, adresse, description, ville)) {
    res.status(400).send("Tout les inputs sont obligatoires");
    return;
  }

  const sql = "SELECT * FROM etablissement WHERE nom = '" + nom + "'";

  connection.query(sql, async (err, result) => {
    if (err) res.status(400).send({ msg: "error", err });
    if (result.length !== 0) {
      res.status(404).send({ msg: "etablissement existant" });
      return;
    }

    const sqlInsert =
      "INSERT INTO etablissement (nom, adresse, 	description, ville) VALUES ('" +
      nom +
      "', '" +
      adresse +
      "', '" +
      description +
      "', '" +
      ville +
      "')";
    connection.query(sqlInsert, (err, result) => {
      if (err) res.status(400).send({ msg: "error", err });
      res.status(201).send({ msg: "etablissement added !" });
    });
  });
});

/****************************update etablissment ......................*/

Router.put("/update", auth, function (req, res) {
  let { nom, adresse, description, ville, id } = req.query;

  if (!(nom, adresse, description, ville, id)) {
    res.status(400).send("Tout les inputs sont obligatoires");
    return;
  }

  const sql = "SELECT * FROM etablissement WHERE id = '" + id + "'";

  connection.query(sql, async (err, result) => {
    if (err) res.status(400).send({ msg: "error", err });
    if (result.length === 0) {
      res.status(404).send({ msg: "etablissement est innexistant" });
      return;
    }

    const sqlUpdate =
      "UPDATE etablissement SET adresse = '" +
      adresse +
      "' ,nom = '" +
      nom +
      "' , description='" +
      description +
      "',ville='" +
      ville +
      "' WHERE id='" +
      id +
      "'";
    connection.query(sqlUpdate, (err, result) => {
      if (err) res.status(400).send({ msg: "error", err });
      res.status(201).send({ msg: "etablissement updated !" });
    });
  });
});

/****************************delete etablissment ......................*/

Router.delete("/delete", auth, function (req, res) {
  let { id } = req.query;

  if (!id) {
    res.status(400).send("l'id de l'etablissement est obligatoire");
    return;
  }

  const sqlDelete = "DELETE FROM etablissement WHERE id = '" + id + "'";
  connection.query(sqlDelete, (err, result) => {
    if (err) res.status(400).send({ msg: "error", err });
    res.status(201).send({ msg: "etablissement deleted !" });
  });
});

Router.get("/get", auth, function (req, res) {
  let { role, id } = req.query;

  if (!role) {
    res.status(400).send("l'role de l'utilisateur est obligatoire");
    return;
  }
  if (role === "ADMIN") {
    const sqlDelete = "SELECT * FROM etablissement";
    connection.query(sqlDelete, (err, result) => {
      if (err) res.status(400).send({ msg: "error", err });
      res.status(201).send({ msg: "success", data: result });
    });
  } else if (role === "GERANT") {
    if (!id) {
      res.status(400).send("l'id de gerant est obligatoire");
      return;
    }
    const sqlDelete =
      "SELECT * FROM etablissement WHERE id_gerant = '" + id + "'";
    connection.query(sqlDelete, (err, result) => {
      if (err) res.status(400).send({ msg: "error", err });
      res.status(201).send({ msg: "success", data: result });
    });
  } else res.status(400).send({ msg: "role introuvable " });
});

module.exports = Router;
