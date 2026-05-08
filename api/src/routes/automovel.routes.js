const express = require("express");
const router = express.Router();

const automovel = require("../controllers/automovel.controller");



router.post("/automovel", automovel.cadastrarAutomovel);
router.get("/automoveis", automovel.listarAutomovel);
router.get("/automoveis/:placa", automovel.buscarAutomovel);
router.put("/automovel/:placa", automovel.atualizarAutomovel);
router.delete("/automoveis/:placa", automovel.deletarAutomovel);


module.exports = router;