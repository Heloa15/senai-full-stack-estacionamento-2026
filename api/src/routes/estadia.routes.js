const express = require("express");
const router = express.Router();


const estadia = require("../controllers/estadia.controller");


router.post("/estadias", estadia.cadastrarEstadia);
router.get("/estadias", estadia.listarEstadia);
router.get("/estadias/:id", estadia.buscarEstadia);
router.put("/estadia/:id", estadia.atualizarEstadia);
router.delete("/estadias/:id", estadia.deletarEstadia);

module.exports = router;