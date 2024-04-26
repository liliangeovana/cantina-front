'use client'
import React, { useState, useEffect } from "react"
import axios from "axios"

interface IngredientesFormData{
    tipo:string,
    genero:string,
            quantidade:string,
            unidade:string,
            validade:string,
            classificacao:string,
}
const useCadastrarIngredientesController = () => {

    const [ingrediente, setIngrediente] = useState<IngredientesFormData>({
        tipo:" ",
        genero:"",
        quantidade:"",
        unidade:"",
        validade:"",
        classificacao:"",
    });

    const [formValid, setFormValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setIngrediente({ ...ingrediente, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setIngrediente({ ...ingrediente, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/ingredientes/register/", ingrediente);
            alert("Cadastro feito com sucesso");
            //limpando os campos
            setIngrediente({
                tipo:" ",
                genero:"",
                quantidade:"",
                unidade:"",
                validade:"",
                classificacao:"",
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
        const { genero } = ingrediente;
        if (genero) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [ingrediente]);

    return { ingrediente, loading, formValid, handleSubmit, handleInputChange, handleSelectChange };
}

export default useCadastrarIngredientesController;