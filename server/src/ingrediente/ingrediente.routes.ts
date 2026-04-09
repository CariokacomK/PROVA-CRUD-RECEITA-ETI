import Router from "express";
import ingredienteController from "./ingrediente.controller.js";

const router = Router();
const path = "/ingrediente";

router.post(path, ingredienteController.criarIngrediente);
router.get(`${path}/:id`, ingredienteController.listarIngredientePorId);
router.get(path, ingredienteController.listarIngredientes);
router.put(`${path}/:id`, ingredienteController.atualizarIngrediente);
router.delete(`${path}/:id`, ingredienteController.deletarIngrediente);