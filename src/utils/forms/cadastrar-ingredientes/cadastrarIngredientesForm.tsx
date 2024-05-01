'use client'
import useCadastrarIngredientesController from "./controller/cadastrarIngredientesController";

export default function CadastrarIngredientesForm() {

  const { ingrediente, loading, formValid, handleSubmit, handleInputChange, handleSelectChange } = useCadastrarIngredientesController();



    // Função para gerar um número específico de campos do formulário
    const renderizarCampos = (quantidade:any) => {
        const campos = [];
        for (let i = 0; i < quantidade; i++) {
            campos.push(
                <div key={i} className="flex flex-row gap-8 h-fit w-full px-16 py-4">
                   
                    {/* Tipo */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor={`tipo-${i}`}>Tipo</label>
                        <select
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                            id={`tipo-${i}`}
                            name={`tipo-${i}`}
                            value={ingrediente.tipo}
                            onChange={handleSelectChange}
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
                    <div className="flex flex-col gap-2">
                        <label htmlFor={`genero-${i}`}>Gênero</label>
                        <select
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                            id={`genero-${i}`}
                            name={`genero-${i}`}
                        >
                            <option selected hidden>...</option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </div>

                     {/* Quantidade */}
                     <div className="flex flex-col gap-1 w-24">
                        <label htmlFor={`quantidade-${i}`}>Quantidade</label>
                        <input
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600"
                            id={`quantidade-${i}`}
                            type="number"
                            name={`quantidade-${i}`}
                            placeholder="1"
                        />
                    </div>

                    {/* Unidade */}
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor={`unidade-${i}`}>Unidade</label>
                        <select
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                            id={`unidade-${i}`}
                            name={`unidade-${i}`}
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

                    {/* Validade */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor={`validade-${i}`}>Validade</label>
                        <input
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600"
                            id={`validade-${i}`}
                            type="date"
                            name={`validade-${i}`}
                            placeholder="Validade"
                        />
                    </div>


                    {/* Classificacao */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor={`classificacao-${i}`}>Qualidade</label>
                        <select
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                            id={`classificacao-${i}`}
                            name={`classificacao-${i}`}
                        >
                            <option selected hidden>...</option>
                            <option value="embalagem">Bom</option>
                            <option value="kg">Mediano</option>
                            <option value="frasco">Ruim</option>
                        </select>
                    </div>
                </div>
            );
        }
        return campos;
    };

    return (
        <div className="flex flex-col items-center h-svh py-10">
            <h1 className="text-cor3 font-medium uppercase">Cadastro ingredientes</h1>

            {renderizarCampos(4)} {/* Chama a função para renderizar 5 conjuntos de campos */}
        </div>
    );
}
