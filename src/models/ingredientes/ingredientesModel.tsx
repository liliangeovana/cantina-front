import mongoose from "mongoose";

const ingredienteSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      required: true
    },
    genero:{
      type: String,
      required: true
    },
    quantidade: {
      type: String,
      required: true
    },
    unidade: {
      type: String,
      required: true
    },
    validade:{
      type:String,
      required: true
    },

    classificacao: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const ingredienteModel = mongoose.models.ingredienteModel || mongoose.model("ingredienteModel", ingredienteSchema);


export default ingredienteModel;
