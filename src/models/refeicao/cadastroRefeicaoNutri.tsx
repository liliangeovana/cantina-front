import mongoose from "mongoose";

const CadastroRefeicaoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    totalAlunos: {
      type: Number,
      required: true
    },
    ingredientes: {
      type: String,
      required: true
    },
    quantidade: {
      type: Number,
      required: true
    },
    descricao: {
      type: String,
      required: true
    },    
  },
  { timestamps: true }
);

const cadastroRefeicaoNutri = mongoose.models.nutriModel || mongoose.model("cadastroRefeicaoNutri", CadastroRefeicaoSchema);

export default cadastroRefeicaoNutri;