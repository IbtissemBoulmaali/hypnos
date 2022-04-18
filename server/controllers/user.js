const express = require("express"),
  mysql = require("mysql"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  config = require("../config/default.json"),
  Router = express.Router();

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hypnosdb",
});
/**************** Register ********************** */

Router.post("/register", (req, res) => {
  let { nom, prenom, email, password, role } = req.query;

  if (!(nom && prenom && email && password && role)) {
    res.status(400).send("Tout les inputs sont obligatoires");
    return
  }

  const sql = "SELECT * FROM user WHERE email = '" + email + "'";

  connection.query(sql, async (err, result) => {
    if (err) res.status(400).send({ msg: "error", err });
    if (result.length !== 0) {
      res.status(400).send({ msg: "user existant" });
      return;
    }

    const cryptedpassword = await bcrypt.hash(password, 10);
    password = cryptedpassword;

    const sqlInsert =
      "INSERT INTO user (nom, prenom ,role,email,password) VALUES ('" +
      nom +
      "', '" +
      prenom +
      "', '" +
      role +
      "', '" +
      email +
      "', '" +
      password +
      "')";
    connection.query(sqlInsert, (err, result) => {
      if (err) res.status(400).send({ msg: "error", err });
      res.status(201).send({ msg: "user added !" });
    });
  });
});

/**************** login ******************** */
Router.get("/login", function (req, res) {
  const user = req.query;
  const email = user.email;
  let password = user.password;

  const sql =
    "SELECT email, password, role ,email FROM user WHERE email = '" +
    email +
    "'";

  connection.query(sql, async (err, result) => {
    if (err) res.status(400).send({ msg: "error", err });
    if (result.length === 0) res.status(400).send({ msg: "user introuvable" });

    if (result && (await bcrypt.compare(password, result[0].password))) {
      const token = jwt.sign(
        { id: result[0].id, email: result[0].email },
        config.tokenKey,
        {
          expiresIn: "5h",
        }
      );
      res.status(200).send({ msg: "success", data: token });
    } else res.status(400).send({ msg: "mot de passe incorrecte" });
  });
});

module.exports = Router;
