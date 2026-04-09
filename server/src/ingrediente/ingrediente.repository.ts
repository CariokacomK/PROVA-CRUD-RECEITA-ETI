import { Prisma } from "../generated/prisma/client.js";
import {prisma} from "../lib/prisma.js";

class IngredienteRepository{
    async create(data: Prisma.IngredienteCreateInput){
        return await prisma.ingrediente.create({data})
    }

    async findAll(){
        return await prisma.ingrediente.findMany({include: {receita: true}});
    }

    async findById(id: string){
        return await prisma.ingrediente.findFirstOrThrow({where: {id}})
    }

    async update(data: Prisma.IngredienteUpdateInput, id: string){
        return await prisma.ingrediente.update({where: {id}, data})
    }

    async delete(id: string){
        return await prisma.ingrediente.delete({where: {id}})
    }
}

export default new IngredienteRepository();