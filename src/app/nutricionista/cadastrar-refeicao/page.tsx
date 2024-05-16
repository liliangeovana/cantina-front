'use client'
import React, { useEffect } from 'react';
import MenuNutri from '@/components/MenuNutri';
import useCadastrarRefeicaoNutriController from './controller/cadastrarRefeicaoNutriController';

const NutriCadastroRefeicao = () => {
    const {
        refeicao,
        ingrediente,
        handleInputChange,
        handleSelectChange,
        handleAddIngredientes,
        handleCancelarIngrediente,
        handleTextChange,
        handleNumberChange,
        handleSubmit
    } = useCadastrarRefeicaoNutriController();

    useEffect(() => {
        handleAddIngredientes();
      }, []);
    return (
        <div className="flex flex-row">
            <title>Cantina Tech | Cadastrar refeição</title>
            <section>
                <MenuNutri />
            </section>

            <div className='w-full flex flex-col'>
                <div className="w-full h-svh flex flex-row p-6 justify-center">
                    <section className="flex h-full flex-col gap-10 w-full items-center justify-center">
                        <div className='text-center text-cor3 font-semibold'>
                            <h2 className='uppercase'>Cadastrar Refeição</h2>
                        </div>
                        <div className="flex flex-row gap-10 text-center">
                            <div className="flex flex-col gap-2">
                                <label
                                    className='font-semibold text-sm'
                                    htmlFor="nomeRefeicao">Refeição</label>
                                <input
                                    className='p-1 rounded-md focus:outline-none border border-gray-400 focus:boder-2 focus:border-cor4'
                                    type="text"
                                    id={`nomeRefeicao`}
                                    name={`nomeRefeicao`}
                                    value={refeicao.nomeRefeicao}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    className='font-semibold text-sm'
                                    htmlFor="turnoRefeicao">Turno</label>
                                <select
                                    className='p-1 rounded-md focus:outline-none  border border-gray-400 focus:boder-2 focus:border-cor4'
                                    name={`turnoRefeicao`}
                                    id={`turnoRefeicao`}
                                    value={refeicao.turnoRefeicao}
                                    onChange={handleSelectChange}
                                >
                                    <option hidden>...</option>
                                    <option value="Matutino">Matutino</option>
                                    <option value="Vespertino">Vespertino</option>
                                    <option value="Ambos">Ambos</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                className='font-semibold text-sm'
                                htmlFor="descricaoPreparo">Descrição de preparo</label>
                            <textarea
                                className="w-96 p-1 rounded-md focus:outline-none  border border-gray-400 focus:boder-2 focus:border-cor4"
                                name={`descricaoPreparo`}
                                id={`descricaoPreparo`}
                                rows={10}
                                value={refeicao.descricaoPreparo}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button
                            className='w-40 bg-cor4 p-1 rounded-md text-white hover:bg-green-600'
                            onClick={handleSubmit}
                        >
                            Cadastrar
                        </button>
                    </section>

                    <section className="w-full h-full overflow-auto">
                    <p className='text-right text-red-600 text-xs'>*valores para 1 aluno</p>
                        <table className="w-full border-separate border-spacing-y-6">
                            <thead>
                                <tr>
                                    <th className="text-center font-semibold text-sm">Ingrediente</th>
                                    <th className="text-center font-semibold text-sm">Percapita (g)</th>
                                </tr>
                            </thead>
                            <tbody className='border-spacing-2'>
                                {ingrediente.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-center">
                                            <input
                                                type="text"
                                                name={`nomeIngrediente`}
                                                id={`nomeIngrediente`}
                                                value={item.nomeIngrediente}
                                                onChange={(e) => handleTextChange(e, index)}
                                                className='p-1 rounded-md focus:outline-none  border border-gray-400 focus:boder-2 focus:border-cor4'
                                            />
                                        </td>
                                        <td className="text-center">
                                            <input
                                                className='p-1 rounded-md focus:outline-none  border border-gray-400 focus:boder-2 focus:border-cor4'
                                                type="number"
                                                name={`quantidade`}
                                                id={`quantidade`}
                                                value={item.quantidade}
                                                onChange={(e) => handleNumberChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleCancelarIngrediente(index)}
                                                className="w-7 h-7 bg-red-600 hover:bg-red-500 text-white rounded-full focus:outline-none focus:border-gray-600"
                                            >
                                                x
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <button
                            className="mt-4 mx-auto block w-7 h-7 bg-cor4  hover:bg-green-600 text-white rounded-full"
                            onClick={handleAddIngredientes}>+</button>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default NutriCadastroRefeicao;