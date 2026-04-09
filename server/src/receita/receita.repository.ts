import { Prisma } from "../generated/prisma/client";
import {prisma} from "../lib/prisma";

class ReceitaRepository{
    async create(data: Prisma.ReceitaCreateInput){
        return await prisma.receita.create({data})
    }

    async findAll(){
        return await prisma.receita.findMany();
    }

    async findById(id: string){
        return await prisma.receita.findFirstOrThrow({where: {id}})
    }

    async update(data: Prisma.ReceitaUpdateInput, id: string){
        return await prisma.receita.update({where: {id}, data})
    }

    async delete(id: string){
        return await prisma.receita.delete({where: {id}})
    }
}

export default new ReceitaRepository();