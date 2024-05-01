'use client'
import React, { useEffect } from "react";
import useCadastrarIngredientesController from "./controller/cadastrarIngredientesController";

export default function CadastrarIngredientesForm() {
  const {
    ingredientes,
    loading,
    formValid,
    handleSubmit,
    handleInputChange,
    handleSelectChange,
    handleCancelarIngrediente,
    handleAddIngrediente,
    searchValue,
    showOptionsList,
    setShowOptionsList,
    nomesIngredientesLoaded,
    filteredNomesIngredientes,
    handleInputChangeAndClear,
    handleOptionClick,
    handleInputFocus
  } = useCadastrarIngredientesController();

  useEffect(() => {
    handleAddIngrediente();
  }, []);

  return (
    <div className="flex flex-col items-center h-svh py-10"  onClick={() => setShowOptionsList(Array(ingredientes.length).fill(false))}>
      <h1 className="text-cor3 font-medium uppercase p-6">Cadastrar estoque</h1>

      {ingredientes.map((ingrediente, index) => (
        <div key={index} className="grid grid-cols-[auto_6rem_auto_auto_auto_4rem] text-center gap-6 h-fit w-full px-16 py-3">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor={`genero_${index}`}>Nome do produto</label>
            <input
              className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
              id={`genero_${index}`}
              name={`genero_${index}`}
              value={
                ingredientes[index].genero && !showOptionsList[index]
                  ? ingredientes[index].genero 
                  : searchValue
              }
              onChange={(e) => handleInputChangeAndClear(e, index)}
              onFocus={() => handleInputFocus(index)}
              autoComplete="off"
              placeholder="Nome do produto"
            />
            {showOptionsList[index] && nomesIngredientesLoaded && searchValue && (
              <ul className="absolute z-10 w-full bg-white border border-gray-400 rounded-b-lg shadow-lg mt-16">
                {filteredNomesIngredientes.map((nome, i) => (
                  <li
                    key={i}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      handleOptionClick(nome, index);
                    }}
                  >
                    {nome}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quantidade */}
          <div className="flex flex-col gap-2">
            <label htmlFor={`quantidade`}>Quantidade</label>
            <input
              className="p-2 text-center border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600"
              id={`quantidade`}
              type="number"
              name={`quantidadeRecebida`}
              value={ingrediente.quantidadeRecebida}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="1"
            />
          </div>

          {/* Unidade */}
          <div className="flex flex-col gap-2">
            <label htmlFor={`unidade`}>Unidade</label>
            <select
              className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
              id={`unidade`}
              name={`unidade`}
              value={ingrediente.unidade}
              onChange={(e) => handleSelectChange(e, index)}
            >
              <option hidden>...</option>
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
            <label htmlFor={`validade`}>Validade</label>
            <input
              className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600"
              id={`validade`}
              type="date"
              name={`validade`}
              value={ingrediente.validade}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Validade"
            />
          </div>

          {/* Classificacao */}
          <div className="flex flex-col gap-2">
            <label htmlFor={`classificacao`}>Qualidade</label>
            <select
              className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
              id={`classificacao`}
              name={`classificacao`}
              value={ingrediente.classificacao}
              onChange={(e) => handleSelectChange(e, index)}
            >
              <option hidden>...</option>
              <option value="bom">Bom</option>
              <option value="mediano">Mediano</option>
              <option value="ruim">Ruim</option>
            </select>
          </div>

          {/* Botão para cancelar registro de ingrediente individualmente */}
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleCancelarIngrediente(index)}
              className="w-10 h-10 bg-red-600 text-white rounded-full focus:outline-none focus:border-gray-600"
            >
              x
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleAddIngrediente}
          className="w-10 h-10 p-2 bg-cor4 border border-gray-300 hover:bg-green-600 text-white rounded-full focus:outline-none focus:border-gray-600"
        >
          +
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!formValid || loading}
        className={`w-80 p-2 mt-10 border bg-cor4 border-gray-300 hover:bg-green-600 text-white rounded-lg focus:outline-none focus:border-gray-600 ${(!formValid || loading) ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {loading ? "Processando..." : "Cadastrar"}
      </button>
    </div>
  );
}
