let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://bren21:*Bren2146@cluster0.lngd8.mongodb.net/GestorPass?retryWrites=true&w=majority"
  )
  .then(function (db) {
    console.log("Estamos conectados");
  })
  .catch(function (err) {
    console.log(err);
  });

let Pass = require("./src/models/pass");

app.get("/passwords", async function (req, res) {
  let listado = await Pass.find();
  res.send(listado);
});

app.post("/password", async function (req, res) {
  let datos = req.body;
  let newPass = new Pass(datos);
  await newPass.save();
  res.send({mensaje:'OK'});
});
app.put("/password", async function (req, res) {
  let datos = req.body;
  await Pass.updateOne({ _id: datos._id }, {});
  res.send("contraseña Actualizada");
});
app.delete("/password/:id", async function (req, res) {
  let id = req.params.id;
  await Pass.findByIdAndRemove(id);
  res.send({mensaje:'Eliminado'});
});
app.listen(5000);
