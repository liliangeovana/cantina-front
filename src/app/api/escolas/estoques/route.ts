import { NextRequest, NextResponse } from "next/server";
import Ingrediente from "@/models/ingredientes/ingredientesModel";
import schoolModel from "@/models/users/schoolModel";
import { connect } from "../../../../../db";

export async function GET() {
    try {
        await connect();

        // Buscando todas as escolas
        const schools = await schoolModel.find({}, '_id nome').sort({ nome: 1 });

        // Array para armazenar todas as informações de escolas e ingredientes
        const schoolsWithIngredients = [];

        // Iterando sobre cada escola para buscar os ingredientes associados
        for (const school of schools) {
            // Buscando os ingredientes associados à escola
            const ingredientes = await Ingrediente.find({ school: school._id });

            // Log de debug para verificar os ingredientes recuperados
            console.log(`Escola: ${school.nome}, Ingredientes: ${JSON.stringify(ingredientes)}`);

            // Adicionando as informações da escola e ingredientes ao array
            schoolsWithIngredients.push({
                school: {
                    _id: school._id,
                    nome: school.nome
                },
                ingredientes: ingredientes
            });
        }

        return new NextResponse(JSON.stringify({
            message: "Escolas e ingredientes recuperados com sucesso",
            data: schoolsWithIngredients
        }), {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store'
            }
        });
    } catch (error) {
        console.error("Erro ao recuperar escolas e ingredientes:", error);
        return NextResponse.json({ error: "Erro ao recuperar escolas e ingredientes" }, { status: 500 });
    }
}