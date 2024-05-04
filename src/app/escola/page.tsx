'use client'
import React from "react";
import MenuEscola from "@/components/MenuEscola";
import useGetIngredientesEscolaLogadaController from "./controller/getIngredientesEscolaLogadaController";
import Loading from "@/components/Loading";

const VisualizarEstoque = () => {
  const { estoque, loading, error } = useGetIngredientesEscolaLogadaController();
  
  return (
    <div>
      <title>Cantina Tech | Visualizar Estoque</title>
      <div className="flex flex-row">
        <section>
          <MenuEscola />
        </section>
        <section className="w-full">
          <div className="grid grid-cols-3 gap-4">
            {loading ? (
              <Loading />
            ) : error ? (
              <p>Erro ao carregar os ingredientes: {error}</p>
            ) : estoque && estoque.length > 0 ? (
              estoque.map((item:any) => (
                <div key={item._id} className="bg-gray-100 p-4">
                  <h2 className="text-xl font-semibold">{item.genero}</h2>
                  <p>Quantidade: {item.quantidadeEstoque}</p>
                  <p>Unidade: {item.unidade}</p>
                  <p>Validade: {item.validade}</p>
                  <p>Classificação: {item.classificacao}</p>
                </div>
              ))
            ) : (
              <p>Nenhum item no estoque.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VisualizarEstoque;
