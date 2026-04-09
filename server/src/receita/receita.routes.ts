import Router from "express";
import receitaController from "./receita.controller.js";

const router = Router();
const path = "/receita";

router.post(path, receitaController.criarReceita);
router.get(`${path}/:id`, receitaController.listarReceitaPorId);
router.get(path, receitaController.listarReceitas);
router.put(`${path}/:id`, receitaController.atualizarReceita);
router.delete(`${path}/:id`, receitaController.deletarReceita);

export default router;