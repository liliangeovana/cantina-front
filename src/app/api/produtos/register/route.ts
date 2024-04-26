import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../db";
import produtoModel from "@/models/produtos/produtoModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { classificacao, genero, marca, unidade, medida } = reqBody;

        console.log("reqBody", reqBody);

        const produtoExist = await produtoModel.findOne({ genero });

        if (produtoExist) {
            return NextResponse.json({ error: "Produto já cadastrado" }, { status: 400 });
        }

        const newProductRegister = new produtoModel({
            classificacao,
            genero,
            marca,
            unidade,
            medida
        });

        console.log("new product", newProductRegister);

        const produtoRegistrado = await newProductRegister.save();
        console.log(produtoRegistrado);

        return NextResponse.json({
            message: "Produto criado com sucesso",
            success: true,
            produtoRegistrado
        });
    } catch (error) {
        return NextResponse.json({ error: "Produto já cadastrado" }, { status: 500 });
    }
}