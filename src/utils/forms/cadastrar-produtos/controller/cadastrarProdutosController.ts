'use client'
import React, { useState, useEffect } from "react"
import axios from "axios"

interface ProdutoFormData{
    classificacao:string,
    genero:string,
    marca:string,
    unidade: string,
    medida: string
}
const useCadastrarProdutoController = () => {

    const [produto, setProduto] = useState<ProdutoFormData>({
        classificacao: "",
        genero: "",
        marca: "",
        unidade: "",
        medida: "",
    });

    const [formValid, setFormValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/produtos/register/", produto);
            alert("Cadastro feito com sucesso");
            //limpando os campos
            setProduto({
                classificacao: "",
                genero: "",
                marca: "",
                unidade: "",
                medida: "",
            });
        } catch (error) {
            console.log('Cadastro falhou.', error);
            alert('Cadastro falhou.');
        } finally {
            setLoading(false);
        }
    };

    // Verifica se o formulário é válido
    useEffect(() => {
        const { genero } = produto;
        if (genero) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [produto]);

    return { produto, loading, formValid, handleSubmit, handleInputChange, handleSelectChange };
}

export default useCadastrarProdutoController;