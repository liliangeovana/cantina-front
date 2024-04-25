import { connect } from "../../../../../db";
import { NextRequest, NextResponse } from "next/server";
import nutriModel from "@/models/users/nutriModel";
import schoolModel from "@/models/users/schoolModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, perfilSelecionado } = reqBody;
      

      if (!perfilSelecionado) {
          return NextResponse.json({ error: "Perfil não selecionado" }, { status: 400 });
      }

      let userModel;
      // Define o modelo de usuário com base no perfil selecionado
      if (perfilSelecionado === "nutricionista") {
          userModel = nutriModel;
      } else if (perfilSelecionado === "escola") {
          userModel = schoolModel;
      } else {
          return NextResponse.json({ error: "Perfil inválido" }, { status: 400 });
      }

      
      // Verifica se o usuário existe no banco de dados
      const user = await userModel.findOne({ email });
      if (!user) {
          return NextResponse.json({ error: "User does not exist" }, { status: 400 });
      }

      // Verifica se a senha está correta
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
          return NextResponse.json({ error: "Invalid password" }, { status: 400 });
      }

      // Retorna uma resposta de sucesso
      return NextResponse.json({ message: "Login successful", success: true, user });
  } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}