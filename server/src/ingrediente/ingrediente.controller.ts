import {Request, Response} from "express";
import ingredienteRepository from "./ingrediente.repository.js";

class IngredienteController{
    async criarIngrediente(req: Request, res: Response){
        try {
            const ingrediente = await ingredienteRepository.create(req.body);
            res.status(201).json({message: ingrediente});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async listarIngredientePorId(req: Request, res: Response){
        try {
            const ingrediente = await ingredienteRepository.findById(req.params.id as string);
            res.status(200).json({message: ingrediente});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async listarIngredientes(req: Request, res: Response){
        try {
            const ingrediente = await ingredienteRepository.findAll();
            res.status(200).json({message: ingrediente});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async atualizarIngrediente(req: Request, res: Response){
        try {
            const ingrediente = await ingredienteRepository.update(req.body, req.params.id as string);
            res.status(201).json({message: ingrediente});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async deletarIngrediente(req: Request, res: Response){
        try {
            const ingrediente = await ingredienteRepository.delete(req.params.id as string);
            res.status(201).json({message: ingrediente});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
}

export default new IngredienteController();