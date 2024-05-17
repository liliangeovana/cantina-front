'use client'
import React, { useState, useEffect } from "react";
import Menu from "@/components/MenuNutri";
import useBuscarEstoquesController from "./controller/getEstoqueEscolasController";
import Loading from "@/components/Loading";
import { formatarData } from "@/utils/formatarData";

const NutriHomePage = () => {
  const { estoquesEscolas, isLoading } = useBuscarEstoquesController();
  const [escolaSelecionada, setEscolaSelecionada] = useState<string | number | readonly string[] | undefined>(undefined);
  const [filtroMesAno, setFiltroMesAno] = useState<string>("");

  useEffect(() => {
    if (!isLoading && estoquesEscolas.length > 0 && !escolaSelecionada) {
      setEscolaSelecionada(estoquesEscolas[0].school._id);
    }
  }, [isLoading, estoquesEscolas, escolaSelecionada]);

  const handleEscolaSelecionadaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEscolaSelecionada(event.target.value);
  };

  const handleFiltroMesAnoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroMesAno(event.target.value);
  };

  // Verifica se há ingredientes
  const ingredientesExistentes = estoquesEscolas.find((item: any) => item.school._id === escolaSelecionada)?.ingredientes.length > 0;

  return (
    <div>
      <title>Cantina Tech | Home</title>
      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
      <div className="flex flex-row">
        <section>
          <Menu />
        </section>
        <section className="w-full h-svh overflow-auto">
          {isLoading && (
            <div className="flex justify-center items-center h-screen">
              <Loading />
            </div>
          )}

<div>
            {/* Filtros */}
            <div className="filter-container sticky top-0 z-50 bg-white">
              <div className="p-4 flex flex-row gap-6">
                <select
                  value={escolaSelecionada}
                  onChange={handleEscolaSelecionadaChange}
                  className="w-96 border border-gray-300 shadow-sm focus:outline-none focus:boder-2 focus:border-cor4 rounded p-1"
                >
                  {estoquesEscolas.map((item: any, index: number) => (
                    <option key={index} value={item.school._id}>{item.school.nome}</option>
                  ))}
                </select>

                <div>
                  <select
                    id="filtroMesAno"
                    value={filtroMesAno}
                    onChange={handleFiltroMesAnoChange}
                    className="border border-gray-300 shadow-sm focus:outline-none focus:boder-2 focus:border-cor4 rounded p-1"
                  >
                    <option value="">Período</option>
                    {estoquesEscolas.flatMap((item: any) => {
                      return item.ingredientes.map((ingrediente: any) => {
                        const dataRegistro = new Date(ingrediente.createdAt);
                        const mesAno = `${dataRegistro.toLocaleString('pt-BR', { month: 'long' })}/${dataRegistro.getFullYear()}`;
                        return mesAno;
                      });
                    }).filter((item, index, array) => array.indexOf(item) === index)
                      .map((mesAno, index) => (
                        <option key={index} value={mesAno}>{mesAno}</option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ESCOLA SELECIONADA */}
            <div className="text-center p-8 uppercase text-cor3 font-semibold">
              <h2>Estoque {estoquesEscolas.find((item: any) => item.school._id === escolaSelecionada)?.school.nome}</h2>
            </div>

            {/* Renderização condicional dos campos ou da mensagem */}
            {ingredientesExistentes ? (
              <div>
                <div className="grid grid-cols-[20rem_auto_auto_auto_auto] text-center gap-6 px-6">
                  {/* INGREDIENTES */}
                  <div className="flex flex-col gap-5">
                    <h3 className="font-semibold">Ingredientes</h3>
                    <div className="flex flex-col gap-3 m-auto">
                      {estoquesEscolas.find((item: any) => item.school._id === escolaSelecionada)?.ingredientes.map((ingrediente: any, index: number) => (
                        <div key={index} className="bg-white w-64 p-2 rounded-md shadow">
                          <p>{ingrediente.genero}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RECEBIDO */}
                  <div className="flex flex-col gap-5">
                    <h3 className="font-semibold">Recebidos</h3>
                    <div className="flex flex-col gap-3 m-auto">
                      {estoquesEscolas.find((item: any) => item.school._id === escolaSelecionada)?.ingredientes.map((ingrediente: any, index: number) => (
                        <div key={index} className="bg-white w-44 p-2 rounded-md shadow">
                          <p>{ingrediente.quantidadeRecebida}g</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* USADOS */}
                  <div className="flex flex-col gap-5">
                    <h3 className="font-semibold">Usados</h3>

                  </div>


                  {/* EM ESTOQUE */}
                  <div className="flex flex-col gap-5">
                    <h3 className="font-semibold">Em estoque</h3>
                    <div className="flex flex-col gap-3 m-auto">
                      {estoquesEscolas.find((item: any) => item.school._id === escolaSelecionada)?.ingredientes.map((ingrediente: any, index: number) => (
                        <div key={index} className="bg-white w-44 p-2 rounded-md shadow">
                          <p>{ingrediente.quantidadeRecebida}g</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* REGISTRO */}
                  <div className="flex flex-col gap-5">
                    <h3 className="font-semibold">Registro</h3>
                    <div className="flex flex-col gap-3 m-auto">
                      {estoquesEscolas.find((item: any) => item.school._id === escolaSelecionada)?.ingredientes.map((ingrediente: any, index: number) => (
                        <div key={index} className="bg-white w-44 p-2 rounded-md shadow">
                          <p>{formatarData(ingrediente.createdAt)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <p>Nenhum item no estoque</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NutriHomePage;
