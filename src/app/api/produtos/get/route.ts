import { NextResponse } from "next/server";
import { connect } from "../../../../../db";
import produtoModel from "@/models/produtos/produtoMode";

connect()

export async function GET() {
    try {
        
        const produtos = await produtoModel.find();
        console.log(produtos);
        

        return NextResponse.json(produtos, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
