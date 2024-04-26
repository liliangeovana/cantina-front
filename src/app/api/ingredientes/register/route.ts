import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../db";
import ingredienteModel from "@/models/ingredientes/ingredientesModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { tipo, genero, quantidade, unidade, validade, classificacao } = reqBody;

        console.log("reqBody", reqBody);

        const ingredienteExist = await ingredienteModel.findOne({ genero });

        if (ingredienteExist) {
            return NextResponse.json({ error: "Produto já cadastrado" }, { status: 400 });
        }

        const newIngredienteRegister = new ingredienteModel({
            tipo,
            genero,
            quantidade,
            unidade,
            validade,
            classificacao
        });

        console.log("new ingrediente", newIngredienteRegister);

        const ingredienteRegistrado = await newIngredienteRegister.save();
        console.log(ingredienteRegistrado);

        return NextResponse.json({
            message: "Ingrediente criado com sucesso",
            success: true,
            ingredienteRegistrado
        });
    } catch (error) {
        return NextResponse.json({ error: "Ingrediente já cadastrado" }, { status: 500 });
    }
}