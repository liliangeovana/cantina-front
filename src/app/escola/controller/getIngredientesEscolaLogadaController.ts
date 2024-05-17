import { useState, useEffect } from "react";
import axios from "axios";


interface IngredienteEstoque {
    _id: string;
    genero: string;
    quantidadeRecebida: number;
    validade: string;
    classificacao: string;
}

const useGetIngredientesEscolaLogadaController = () => {
    const [estoque, setEstoque] = useState<IngredienteEstoque[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchIngredientesEscola = async () => {
        try {
            const response = await axios.get("/api/ingredientes/estoque-escola");
            const data = response.data.data;
            setEstoque(data);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar ingredientes da escola:", error);
            setError("Erro ao buscar ingredientes da escola");
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchIngredientesEscola();
    }, []);


    return { estoque, loading, error };
};

export default useGetIngredientesEscolaLogadaController;