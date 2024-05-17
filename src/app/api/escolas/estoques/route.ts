import { NextRequest, NextResponse } from "next/server";
import Ingrediente from "@/models/ingredientes/ingredientesModel";
import schoolModel from "@/models/users/schoolModel";
import { connect } from "../../../../../db";

connect();

export async function GET(request: NextRequest) {
    try {

        // Buscando todas as escolas
        const schools = await schoolModel.find({}, '_id nome').sort({ nome: 1 });

        // Array para armazenar todas as informações de escolas e ingredientes
        const schoolsWithIngredients = [];

        // Iterando sobre cada escola para buscar os ingredientes associados
        for (const school of schools) {
            // Buscando os ingredientes associados à escola
            const ingredientes = await Ingrediente.find({ school: school._id });

            // Adicionando as informações da escola e ingredientes ao array
            schoolsWithIngredients.push({
                school: {
                    _id: school._id,
                    nome: school.nome
                },
                ingredientes: ingredientes
            });
        }

        return NextResponse.json({
            message: "Escolas e ingredientes recuperados com sucesso",
            data: schoolsWithIngredients
        });
    } catch (error) {
        console.error("Erro ao recuperar escolas e ingredientes:", error);
        return NextResponse.json({ error: "Erro ao recuperar escolas e ingredientes" }, { status: 500 });
    }
}
