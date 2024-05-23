'use client'
import { useState, ChangeEvent, useEffect, useRef } from 'react';
import LoadingButtons from '@/components/LoadingButtons';
import MenuEscola from '@/components/MenuEscola';
import useGetRefeicaoPadraController from './controller/getRefeicaoPadraoController';
import useUpdateRefeicaoController from './controller/updateRefeicaoPadraoController';
import useCadastrarRefeicaoEscolaController from './controller/postRefeicaoController';

const EscolaCadastroRefeicao = () => {
    const {
        handleSubmit,
        loading: postLoading
    } = useCadastrarRefeicaoEscolaController();

    const {
        ingredientesAdicionados,
        setIngredientesAdicionados,
        adicionarNovoIngrediente,
        removerIngredienteAdicionado,
    } = useUpdateRefeicaoController();

    const {
        refeicaoPadrao,
        quantidadeAlunos,
        handleQuantidadeAlunosChange,
        loading,
        error,
        selectedRefeicao,
        setSelectedRefeicao,
        handleSelectChange,
    } = useGetRefeicaoPadraController();

    const [searchValue, setSearchValue] = useState('');
    const dropdownRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [observacao, setObservacao] = useState('');
    const [observacaoModalVisible, setObservacaoModalVisible] = useState(false);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event: any) => {
        if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };


    const toggleObservacaoModal = () => {
        setObservacaoModalVisible(!observacaoModalVisible);
    };

    const handleIngredientChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, ingredienteId: any) => {
        const { value } = e.target;
        if (selectedRefeicao !== null) {
            const ingredienteIndex = selectedRefeicao.ingredientes.findIndex(ingrediente => ingrediente._id === ingredienteId);
            if (ingredienteIndex !== -1) {
                const novosIngredientes = [...selectedRefeicao.ingredientes];
                novosIngredientes[ingredienteIndex] = {
                    ...novosIngredientes[ingredienteIndex],
                    nomeIngrediente: value
                };
                setSelectedRefeicao({
                    ...selectedRefeicao,
                    ingredientes: novosIngredientes
                });
            }
        }
    };

    const removerIngrediente = (index: number) => {
        if (selectedRefeicao && selectedRefeicao.ingredientes && selectedRefeicao.ingredientes.length > index) {
            const novosIngredientes = [...selectedRefeicao.ingredientes];
            novosIngredientes.splice(index, 1);
            setSelectedRefeicao({
                ...selectedRefeicao,
                ingredientes: novosIngredientes
            });
        }
    };

    const handleNomeRefeicaoBlur = () => {
        if (!searchValue.trim()) {
            // Limpa os ingredientes renderizados
            setSelectedRefeicao(null);
        }
    };

    const handleOptionSelect = (option: any) => {
        setSearchValue(option.nome);
        handleSelectChange(option._id);
        setDropdownOpen(false);
    };


    const handleSubmitForm = () => {
        if (selectedRefeicao && quantidadeAlunos && selectedRefeicao.ingredientes.length > 0) {
            const ingredientesMultiplicados = selectedRefeicao.ingredientes.map(ingrediente => ({
                ...ingrediente,
                quantidade: ingrediente.quantidade * Number(quantidadeAlunos) // Multiplica a quantidade pelo número de alunos
            }));

            const refeicaoParaEnviar = {
                nomeRefeicao: selectedRefeicao.nome,
                turnoRefeicao: selectedRefeicao.turno,
                quantidadeAlunos: Number(quantidadeAlunos),
                descricaoPreparo: selectedRefeicao.descricao,
                padraoMantido: true,
                observacao: observacao,
                ingredientes: ingredientesMultiplicados, // Envia os ingredientes com as quantidades multiplicadas
                ingredientesAdicionados: ingredientesAdicionados.filter(ingrediente => ingrediente.nomeIngrediente && ingrediente.quantidade),
            };

            handleSubmit(refeicaoParaEnviar);
        }
    };


    if (loading) {
        return <LoadingButtons />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const filteredRefeicoes = refeicaoPadrao.filter(refeicao =>
        refeicao.nome.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="flex flex-row h-svh">
            <title>Cantina Tech | Cadastrar refeição</title>
            <section>
                <MenuEscola />
            </section>

            <div className='w-full flex flex-col overflow-auto py-10'>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <div className='w-full flex justify-center items-center text-center uppercase text-cor3 font-semibold'>
                            <p>Cadastrar Refeições</p>
                        </div>
                        {selectedRefeicao && selectedRefeicao.ingredientes.length > 0 && Number(quantidadeAlunos) > 0 && (
                            <div className='w-full flex justify-end pr-8'>
                                <button
                                    onClick={() => {
                                        setIsEditing(!isEditing); // Alterna o estado de edição
                                        if (isEditing) {
                                            toggleObservacaoModal(); // Abre o modal somente ao finalizar a edição
                                        }
                                    }}
                                    className="wrapped text-sm p-2 border bg-red-600 hover:bg-red-500 text-white rounded-lg focus:outline-none focus:border-gray-600"
                                >
                                    {isEditing ? "Finalizar Edição" : "Editar refeição"}
                                </button>
                            </div>
                        )}

                        {observacaoModalVisible && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                                <div className="bg-white rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-4">Observação</h2>
                                    <textarea
                                        className='w-full p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                        id="observacao"
                                        name="observacao"
                                        value={observacao}
                                        onChange={(e) => setObservacao(e.target.value)}
                                    />
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={toggleObservacaoModal}
                                            className="p-2 text-white bg-blue-600 hover:bg-blue-500 rounded-md focus:outline-none"
                                        >
                                            Salvar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-row px-6">
                    <div className='w-1/2 flex flex-col gap-6 mt-12 overflow-auto'>
                        <section className="flex flex-col gap-8 items-center">
                            <div className='w-full flex flex-col gap-6 items-center justify-center'>
                                <div className="w-96 flex flex-col gap-2">
                                    <label className='font-semibold text-sm' htmlFor="nomeRefeicao">Refeição</label>
                                    <div className="relative" ref={dropdownRef}>
                                        <input
                                            type="text"
                                            autoComplete='off'
                                            className='w-full p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                            id="nomeRefeicao"
                                            name="nomeRefeicao"
                                            value={
                                                selectedRefeicao && !dropdownOpen
                                                    ? selectedRefeicao.nome
                                                    : searchValue
                                            }
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            onFocus={() => setDropdownOpen(true)}
                                            onBlur={handleNomeRefeicaoBlur}
                                            placeholder="Pesquise a refeição..."
                                        />
                                        {dropdownOpen && (
                                            <ul className="absolute z-10 w-full bg-white border border-gray-400 rounded-b-lg shadow-lg mt-2">
                                                {filteredRefeicoes.map(refeicao => (
                                                    <li key={refeicao._id} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleOptionSelect(refeicao)}>
                                                        {refeicao.nome}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between text-center gap-10'>
                                    <div className='w-52 flex flex-col gap-2 items-center'>
                                        <label className='font-semibold text-sm' htmlFor="quantidadeAlunos">Quantidade de alunos</label>
                                        <input
                                            className='w-32 p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                            type="number"
                                            id="quantidadeAlunos"
                                            name="quantidadeAlunos"
                                            value={quantidadeAlunos}
                                            onChange={handleQuantidadeAlunosChange}
                                        />
                                    </div>

                                    <div className='w-40 flex flex-col gap-2 items-center'>
                                        <label className='font-semibold text-sm' htmlFor="turnoRefeicao">Turno</label>
                                        <select
                                            className='w-full p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                            id="turnoRefeicao"
                                            name="turnoRefeicao"
                                            value={selectedRefeicao?.turno || ''}
                                            onChange={(e) => setSelectedRefeicao({
                                                ...selectedRefeicao!,
                                                turno: e.target.value
                                            })}
                                        >
                                            <option value="">Selecione o turno</option>
                                            <option value="Manhã">Manhã</option>
                                            <option value="Tarde">Tarde</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="flex flex-col gap-8 items-center">
                            <div className='w-full flex flex-col gap-6 items-center justify-center'>
                                <div className='w-96 flex flex-col gap-2'>
                                    <label className='font-semibold text-sm' htmlFor="descricaoPreparo">Descrição do Preparo</label>
                                    <textarea
                                        rows={10}
                                        className='w-full p-1 text-justify rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                        id="descricaoPreparo"
                                        name="descricaoPreparo"
                                        value={selectedRefeicao?.descricao || ''}
                                        onChange={(e) => setSelectedRefeicao({
                                            ...selectedRefeicao!,
                                            descricao: e.target.value
                                        })}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className='w-1/2 flex flex-col gap-6 mt-12 overflow-auto'>

                        <section className="flex flex-col gap-8 items-center">
                            <div className='w-full flex flex-col gap-6 items-center justify-center'>
                                <div className='w-96 flex flex-col gap-2'>
                                    <div className='flex flex-row justify-between'>
                                        <label className='font-semibold m-auto text-sm' htmlFor="ingredientes">Ingredientes</label>
                                        <label className='font-semibold  text-sm' htmlFor="ingredientes">Quantidade (g)</label>
                                    </div>
                                    {selectedRefeicao?.ingredientes.map((ingrediente, index) => (
                                        <div key={ingrediente._id} className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <input
                                                    className='w-64 bg-white p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                                    type="text"
                                                    value={ingrediente.nomeIngrediente}
                                                    onChange={(e) => handleIngredientChange(e, ingrediente._id)}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            {Number(quantidadeAlunos) > 0 && (
                                                <div>
                                                    <input
                                                        className='w-32 bg-white text-center p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                                        type="number"
                                                        value={Number(ingrediente.quantidade) * Number(quantidadeAlunos)}
                                                        onChange={(e) => handleIngredientChange(e, ingrediente._id)}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                            )}
                                            {isEditing && (
                                                <div className='w-20'>
                                                    <button
                                                        className="w-7 h-7 bg-red-600 hover:bg-red-500 text-white rounded-full focus:outline-none focus:border-gray-600"
                                                        onClick={() => removerIngrediente(index)}>
                                                        x
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {ingredientesAdicionados.length > 0 && !observacaoModalVisible && !isEditing && (
                                        <div>
                                            <h2 className='font-semibold m-auto text-sm py-3' >Ingredientes Adicionados:</h2>
                                            <ul>
                                                {ingredientesAdicionados.map((ingrediente, index) => (
                                                    <span className='w-52 rounded-md border border-gray-400 flex flex-row justify-between p-2 bg-white mt-1' key={index}>
                                                        <span>{ingrediente.nomeIngrediente}</span>
                                                        <span> {ingrediente.quantidade}g</span>
                                                    </span>
                                                ))}
                                            </ul>
                                        </div>
                                    )}




                                    {isEditing && (
                                        <div className='w-full flex flex-col gap-6 items-center justify-center'>
                                            <div className='w-96 flex flex-col gap-2'>
                                                <p className='font-semibold text-sm'>Adicionados: </p>
                                                {ingredientesAdicionados.map((ingrediente, index) => (
                                                    <div key={index} className='flex flex-row gap-2 items-center'>
                                                        <input
                                                            className='w-72 bg-white p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                                            type="text"
                                                            value={ingrediente.nomeIngrediente}
                                                            onChange={(e) => {
                                                                const novosIngredientes = [...ingredientesAdicionados];
                                                                novosIngredientes[index].nomeIngrediente = e.target.value;
                                                                setIngredientesAdicionados(novosIngredientes);
                                                            }}
                                                        />
                                                        <input
                                                            className='w-24 bg-white text-center p-1 rounded-md focus:outline-none border border-gray-400 focus:border-2 focus:border-cor4'
                                                            type="number"
                                                            value={ingrediente.quantidade}
                                                            onChange={(e) => {
                                                                const novosIngredientes = [...ingredientesAdicionados];
                                                                novosIngredientes[index].quantidade = e.target.value;
                                                                setIngredientesAdicionados(novosIngredientes);
                                                            }}
                                                        />
                                                        <div className='w-20'>
                                                            <button
                                                                className="w-7 h-7 bg-red-600 hover:bg-red-500 text-white rounded-full focus:outline-none focus:border-gray-600"
                                                                onClick={() => removerIngredienteAdicionado(index, true)}>
                                                                x
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {isEditing && (
                                    <button
                                        onClick={() => {
                                            setIsEditing(true); 
                                            adicionarNovoIngrediente(); // Chama a função para adicionar novo ingrediente
                                        }}
                                        className="w-7 h-7 bg-green-600 hover:bg-green-500 text-white rounded-full focus:outline-none focus:border-gray-600"
                                    >
                                        +
                                    </button>
                                )}
                                {observacao && !observacaoModalVisible && (
                                    <div className="w-96">
                                        <p className="font-semibold text-red-600">Observação</p>
                                        <p>{observacao}</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>

                <div className='w-full flex justify-center mt-6'>
                    <button
                        disabled={isEditing}
                        onClick={handleSubmitForm}
                        className={`w-40 h-10 p-2 border bg-cor4 border-gray-300 hover:bg-green-600 text-white rounded-lg focus:outline-none ${isEditing ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EscolaCadastroRefeicao;