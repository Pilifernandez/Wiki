const express = require("express");
const volleyball = require("volleyball");
var bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const { db } = require("./models");
// const { Sequalize } = require("sequelize");

const app = express();

app.use("/", routes);
app.use(volleyball);
app.use(bodyParser.json());
app.use(express.static("public"));

// apuntá nunjucks al directorio conteniendo templates y apagando el cacheo,
// configure devuelve una instancia Enviornment que vamos a querer usar para
// agregar Markdown después.
var env = nunjucks.configure("views", { noCache: true });
// hace res.render funcionar con archivos html
app.set("view engine", "html");
// cuando res.render funciona con archivos html, haz que use nunjucks para eso.
app.engine("html", nunjucks.render);

// Donde tu servidor y la app de express están siendo definidas
// ... otras cosas
db.sync() //{force: true}
  .then(function () {
    console.log("Conectado a la db");
    app.listen(3000, function () {
      console.log("Server online");
    });
  })
  .catch(console.error);
