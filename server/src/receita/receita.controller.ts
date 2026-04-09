import {Request, Response} from "express";
import receitaRepository from "./receita.repository";

class ReceitaController{
    async criarReceita(req: Request, res: Response){
        try {
            const receita = await receitaRepository.create(req.body);
            res.status(201).json({message: receita});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async listarReceitaPorId(req: Request, res: Response){
        try {
            const receita = await receitaRepository.findById(req.params.id as string);
            res.status(200).json({message: receita});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async listarReceitas(req: Request, res: Response){
        try {
            const receita = await receitaRepository.findAll();
            res.status(200).json({message: receita});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async atualizarReceita(req: Request, res: Response){
        try {
            const receita = await receitaRepository.update(req.body, req.params.id as string);
            res.status(201).json({message: receita});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async deletarReceita(req: Request, res: Response){
        try {
            const receita = await receitaRepository.delete(req.params.id as string);
            res.status(201).json({message: receita});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
}

export default new ReceitaController();