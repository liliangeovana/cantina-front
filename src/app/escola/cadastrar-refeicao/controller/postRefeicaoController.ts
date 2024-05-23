import { useState } from "react";
import axios from "axios";

interface Ingrediente {
    _id: string;
    nomeIngrediente: string;
    quantidade: number;
}

interface IngredienteAdicionado extends Ingrediente {}

interface Refeicao {
    nomeRefeicao: string;
    turnoRefeicao: string;
    quantidadeAlunos: number;
    descricaoPreparo: string;
    padraoMantido: boolean;
    observacao: string;
    ingredientes: Ingrediente[];
    ingredientesAdicionados: IngredienteAdicionado[];
}

const useCadastrarRefeicaoEscolaController = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (refeicao: Refeicao) => {
        try {
            setLoading(true);

            const dadosParaEnviar = {
                nomeRefeicao: refeicao.nomeRefeicao,
                turnoRefeicao: refeicao.turnoRefeicao,
                quantidadeAlunos: refeicao.quantidadeAlunos,
                descricaoPreparo: refeicao.descricaoPreparo,
                padraoMantido: refeicao.padraoMantido,
                observacao: refeicao.observacao,
                ingredientes: refeicao.ingredientes,
                ingredientesAdicionados: refeicao.ingredientesAdicionados.filter(ingrediente => ingrediente.nomeIngrediente && ingrediente.quantidade),
            };

            console.log("Dados a serem enviados:", dadosParaEnviar);

            const response = await axios.post("/api/refeicoes/escolas/register", dadosParaEnviar);
            alert("Refeição cadastrada com sucesso");
            window.location.reload();
        } catch (error) {
            console.error('Cadastro falhou:', error);
            alert('Cadastro falhou.');
        } finally {
            setLoading(false);
        }
    };

    return {
        handleSubmit,
        loading,
    };
};

export default useCadastrarRefeicaoEscolaController;