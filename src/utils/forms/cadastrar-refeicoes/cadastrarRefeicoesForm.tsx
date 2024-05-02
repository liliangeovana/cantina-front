'use client'
import React from 'react';
import useCadastrarProdutoController from './controller/cadastrarRefeicoesController';

export default function CadastrarRefeicoesForm() {
    const { produto, loading, formValid, handleSubmit, handleInputChange, handleSelectChange } = useCadastrarProdutoController();

    return (
        <div className="flex flex-col items-center h-svh p-14">
            <h1 className="text-cor3 font-medium uppercase">Cadastro produtos</h1>

            <div className="flex flex-col gap-y-6 h-fit w-full px-16">

                {/* CLASSIFICAÇÃO */}
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="classificacao">Classificação</label>
                    <select
                        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                        id="classificacao"
                        value={produto.classificacao}
                        onChange={handleSelectChange}
                        name="classificacao"
                    >
                        <option selected hidden>...</option>
                        <option value="estivas">Estivas</option>
                        <option value="proteina">Proteina</option>
                        <option value="frios">Frios</option>
                        <option value="agricultura">Agricultura</option>
                        <option value="hortifruti">Hortfruti</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>

                {/* Gênero */}
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="genero">Gênero</label>
                    <input
                        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                        id="genero"
                        type="text"
                        name="genero"
                        placeholder="Arroz tipo 1"
                        value={produto.genero}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Marca */}
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="marca">Marca</label>
                    <input
                        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600"
                        id="marca"
                        type="text"
                        name="marca"
                        placeholder="Marca (opcional)"
                        value={produto.marca}
                        onChange={handleInputChange}                    />
                </div>

                {/* Unidade */}
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="unidade">Unidade</label>
                    <select
                        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                        id="unidade"
                        value={produto.unidade}
                        onChange={handleSelectChange}
                        name="unidade"
                    >
                        <option selected hidden>...</option>
                        <option value="embalagem">Embalagem</option>
                        <option value="kg">Kg</option>
                        <option value="frasco">Frasco</option>
                        <option value="cartela">Cartela</option>
                        <option value="unidade">Unidade</option>
                        <option value="pote">Pote</option>
                        <option value="maço">Maço</option>
                    </select>
                </div>

                <details>
                    <summary>Medida de embalagem </summary>
                    {/* Medida */}
                    <div className="flex flex-col gap-y-1 p-4">
                        <label htmlFor="medida">Medida</label>
                        <input
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600"
                            id="medida"
                            type="text"
                            name="medida"
                            placeholder="Embalagem 160g a 170g"
                            value={produto.medida}
                            onChange={handleInputChange}
                        />
                    </div>
                </details>
            </div>
            <button
                    onClick={handleSubmit}
                    disabled={!formValid || loading}
                    className={`w-80 p-2 mt-8 border bg-cor4 border-gray-300 hover:bg-green-600 text-white rounded-lg focus:outline-none focus:border-gray-600 ${(!formValid || loading) ? "cursor-not-allowed opacity-50" : ""}`}
                >
                    {loading ? "Processando..." : "Cadastrar"}
                </button>
        </div>
    )
}
