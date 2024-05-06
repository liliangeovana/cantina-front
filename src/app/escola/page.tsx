'use client'
import React from "react";
import MenuEscola from "@/components/MenuEscola";
import useGetIngredientesEscolaLogadaController from "./controller/getIngredientesEscolaLogadaController";
import Loading from "@/components/Loading";
import { formatarData } from "@/utils/formatarData";

const VisualizarEstoque = () => {
  const { estoque, loading, error } = useGetIngredientesEscolaLogadaController();

  // Dividir os itens do estoque em duas listas: uma para os gêneros e outra para as quantidades e validades
  const generos = estoque.map(item => item.genero);
  const quantidadesEValidades = estoque.map(item => ({
    quantidade: item.quantidadeEstoque,
    validade: formatarData(item.validade),
    unidade: item.unidade
  }));

  return (
    <div>
      <title>Cantina Tech | Visualizar Estoque</title>
      <div className="flex flex-row">
        <section>
          <MenuEscola />
        </section>
        <section className="w-full">
          <div className="h-svh p-8 flex justify-center overflow-auto"> {/* Removido justify-center */}
            {loading && (
              <div className="flex justify-center items-center">
                <Loading />
              </div>
            )}
            {error && (
              <p>Erro ao carregar os ingredientes: {error}</p>
            )}
            {estoque && estoque.length === 0 && !loading && !error && (
              <div className="flex justify-center items-center">
                <p>Nenhum item no estoque.</p>
              </div>
            )}
            {!loading && !error && estoque && estoque.length > 0 && (
              <div className="w-full text-center">
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Estoque</h2>
                    <div className="flex flex-col gap-3 m-auto">
                      {generos.map((genero, index) => (
                        <div className="bg-white w-44 p-2 rounded-md shadow" key={index}> {/* Add key prop */}
                          <p>{genero}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Quantidade</h2>
                    <div className="flex flex-col gap-3 m-auto">
                      {quantidadesEValidades.map((item, index) => (
                        <div className="bg-white w-44 p-2 rounded-md shadow" key={index}> {/* Add key prop */}
                          <p>{item.quantidade} {item.unidade}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Validade</h2>
                    <div className="flex flex-col gap-3 m-auto">
                      {quantidadesEValidades.map((item, index) => (
                        <div className="bg-white w-44 p-2 rounded-md shadow" key={index}> {/* Add key prop */}
                          <p>{item.validade}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VisualizarEstoque;