'use client'
import React, { useState, useEffect } from 'react';
import MenuNutri from '@/components/MenuNutri';
import useBuscarRefeicoesEscolasController from '../controller/getRefeicoesEscolaController';
import Loading from '@/components/Loading';
import Link from 'next/link';

const HistoricoPage: React.FC = () => {
    const { refeicoesEscolas, refeicao, isLoading } = useBuscarRefeicoesEscolasController();
    const [escolaSelecionada, setEscolaSelecionada] = useState<string | undefined>(undefined);
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [organizedMeals, setOrganizedMeals] = useState<{ [key: string]: { _id: string, date: string, nome: string, padraoMantido: boolean }[] }>({ "Manhã": [], "Tarde": [] });
    const [refeicoesDaEscolaSelecionada, setRefeicoesDaEscolaSelecionada] = useState<any[]>([]);

    useEffect(() => {
        if (!isLoading && refeicoesEscolas.length > 0 && !escolaSelecionada) {
            setEscolaSelecionada(refeicoesEscolas[0].school._id);
        }
    }, [isLoading, refeicoesEscolas, escolaSelecionada]);

    useEffect(() => {
        // Filtrando as refeições da escola selecionada
        const filteredRefeicoes = refeicoesEscolas.filter(refeicaoEscola => refeicaoEscola.school._id === escolaSelecionada);
        console.log('Refeições filtradas:', filteredRefeicoes);
        const refeicoesDaEscola = filteredRefeicoes.length > 0 ? filteredRefeicoes[0].meals : [];
        setRefeicoesDaEscolaSelecionada(refeicoesDaEscola);
    }, [refeicoesEscolas, escolaSelecionada]);

    useEffect(() => {
        const mealsByShift: { [key: string]: { _id: string, date: string, nome: string, padraoMantido: boolean }[] } = { "Manhã": [], "Tarde": [] };
        refeicoesDaEscolaSelecionada.forEach(meal => {
            const date = new Date(meal.createdAt).toLocaleDateString();
            mealsByShift[meal.turno].push({ _id: meal._id, date, nome: meal.nome, padraoMantido: meal.padraoMantido });
        });
        setOrganizedMeals(mealsByShift);
    }, [refeicoesDaEscolaSelecionada]);

    useEffect(() => {
        const filteredMeals = refeicao.filter(meal => {
            const mealDate = new Date(meal.createdAt);
            const mealMonth = `${mealDate.getMonth() + 1}-${mealDate.getFullYear()}`;
            return selectedMonth === "" || mealMonth === selectedMonth;
        });

        const mealsByShift: { [key: string]: { _id: string, date: string, nome: string, padraoMantido: boolean }[] } = { "Manhã": [], "Tarde": [] };
        filteredMeals.forEach(meal => {
            const date = new Date(meal.createdAt).toLocaleDateString();
            mealsByShift[meal.turno].push({ _id: meal._id, date, nome: meal.nome, padraoMantido: meal.padraoMantido });
        });
        setOrganizedMeals(mealsByShift);
    }, [selectedMonth, refeicao]);

    const handleEscolaSelecionadaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEscolaSelecionada(event.target.value);
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const uniqueMonths = Array.from(new Set(refeicoesDaEscolaSelecionada.map(meal => {
        const date = new Date(meal.createdAt);
        return `${date.getMonth() + 1}-${date.getFullYear()}`;
    })));

    return(
        <div className="flex flex-row h-svh">
            <div className='sticky top-0'>
                <title>Histórico de refeições</title>
                <MenuNutri />
            </div>

            <div className="flex flex-col w-full">
                {/**FILTRO */}
                <div className="filter-container p-4 sticky top-0 z-50 bg-white">
                    <select
                        value={escolaSelecionada}
                        onChange={handleEscolaSelecionadaChange}
                        className="w-60 border border-gray-300 shadow-sm focus:outline-none focus:border-2 focus:border-cor4 rounded p-1"
                    >
                        {refeicoesEscolas.map((item) => (
                            <option key={item.school._id} value={item.school._id}>{item.school.nome}</option>
                        ))}
                    </select>
                    <select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="w-60 border border-gray-300 shadow-sm focus:outline-none focus:border-2 focus:border-cor4 rounded p-1 ml-4"
                    >
                        <option value="">Todos os meses</option>
                        {uniqueMonths.map((month, index) => {
                            const [monthValue, yearValue] = month.split('-');
                            return (
                                <option key={index} value={month}>{`${monthValue.padStart(2, '0')}/${yearValue}`}</option>
                            );
                        })}
                    </select>
                </div>

                {isLoading ? (
    <div className="h-full flex justify-center items-center">
        <Loading />
    </div>
) : (
    <div className="flex-1 p-10 overflow-auto">
        {/**TELA PRINCIPAL */}
        {refeicoesDaEscolaSelecionada.length === 0 ? (
            <div className="p-8 flex justify-center items-center">
                <p>Nenhuma refeição produzida</p>
            </div>
        ) : (
            <div className='flex flex-col'>
                <p className='text-red-500 text-xs pb-3 text-right'>*selecione uma refeição para mais detalhes</p>
                <div className='grid grid-cols-2 gap-10 overflow-auto'>
                    {["Manhã", "Tarde"].map(shift => (
                        <div key={shift}>
                            <h2 className='font-semibold text-center mb-6 text-cor3 uppercase'>{shift}</h2>
                            <div>
                                {organizedMeals[shift] && organizedMeals[shift].length > 0 ? (
                                    organizedMeals[shift].map((meal, index) => {
                                        return (
                                            <div key={index} className="flex flex-col gap-2 mb-6 text-center p-4">
                                                <span className='font-semibold text-sm '>{meal.date}</span>
                                                <Link className={meal.padraoMantido ? 'bg-white border rounded-md p-2 shadow-sm cursor-pointer hover:shadow-md' : 'bg-white border rounded-md border-red-500 p-2 shadow-sm cursor-pointer hover:shadow-md'} href={`/nutricionista/historico-refeicoes/detalhes/${meal._id}`}>
                                                    <span>
                                                        {meal.nome}
                                                    </span>
                                                </Link>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className='text-center'>Nenhuma refeição cadastrada</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
)}

            </div>
        </div>
    );
};

export default HistoricoPage;
