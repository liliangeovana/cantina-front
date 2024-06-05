'use client'
import React, { useState, useEffect } from 'react';
import MenuNutri from '@/components/MenuNutri';
import useBuscarRefeicoesEscolasController from '../controller/getRefeicoesEscolaController';
import Loading from '@/components/Loading';

const HistoricoPage: React.FC = () => {
    const { refeicoesEscolas, refeicao, isLoading } = useBuscarRefeicoesEscolasController();
    const [escolaSelecionada, setEscolaSelecionada] = useState<string | undefined>(undefined);
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [organizedMeals, setOrganizedMeals] = useState<{ [key: string]: { date: string, nome: string, padraoMantido: boolean }[] }>({ "Manhã": [], "Tarde": [] });

    useEffect(() => {
        if (!isLoading && refeicoesEscolas.length > 0 && !escolaSelecionada) {
            setEscolaSelecionada(refeicoesEscolas[0].school._id);
        }
    }, [isLoading, refeicoesEscolas, escolaSelecionada]);

    useEffect(() => {
        const mealsByShift: { [key: string]: { date: string, nome: string, padraoMantido: boolean }[] } = { "Manhã": [], "Tarde": [] };
        refeicao.forEach(meal => {
            const date = new Date(meal.createdAt).toLocaleDateString();
            mealsByShift[meal.turno].push({ date, nome: meal.nome, padraoMantido: meal.padraoMantido });
        });
        setOrganizedMeals(mealsByShift);
    }, [isLoading, refeicao]);

    useEffect(() => {
        const filteredMeals = refeicao.filter(meal => {
            const mealDate = new Date(meal.createdAt);
            const mealMonth = `${mealDate.getMonth() + 1}-${mealDate.getFullYear()}`;
            return selectedMonth === "" || mealMonth === selectedMonth;
        });

        const mealsByShift: { [key: string]: { date: string, nome: string, padraoMantido: boolean }[] } = { "Manhã": [], "Tarde": [] };
        filteredMeals.forEach(meal => {
            const date = new Date(meal.createdAt).toLocaleDateString();
            mealsByShift[meal.turno].push({ date, nome: meal.nome, padraoMantido: meal.padraoMantido });
        });
        setOrganizedMeals(prevOrganizedMeals => ({ ...prevOrganizedMeals, ...mealsByShift }));
    }, [selectedMonth, refeicao]);

    const handleEscolaSelecionadaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEscolaSelecionada(event.target.value);
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const filteredRefeicoes = refeicoesEscolas.filter(refeicaoEscola => refeicaoEscola.school._id === escolaSelecionada);

    const uniqueMonths = Array.from(new Set(refeicao.map(meal => {
        const date = new Date(meal.createdAt);
        return `${date.getMonth() + 1}-${date.getFullYear()}`;
    })));

    return (
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
                        {filteredRefeicoes.length === 0 || filteredRefeicoes[0].meals.length === 0 ? (
                            <div className="p-8 flex justify-center items-center">
                                <p>Nenhuma refeição produzida</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-2 gap-10 overflow-auto'>
                                {["Manhã", "Tarde"].map(shift => (
                                    <div key={shift}>
                                        <h2 className='font-semibold text-center mb-6 text-cor3 uppercase'>{shift}</h2>
                                        <div>
                                            {organizedMeals[shift] && organizedMeals[shift].length > 0 ? (
                                                organizedMeals[shift].map((meal, index) => {
                                                    return (
                                                        <div key={index} className="flex flex-col gap-2 mb-6 text-center p-4">
                                                            <span className='font-semibold text-sm'>{meal.date}</span> <span  className={meal.padraoMantido ? 'bg-white border rounded-md p-2 shadow-md' : 'bg-white border rounded-md border-red-500 p-2 shadow-md'}>{meal.nome}</span></div>
                                                        
                                                    );
                                                })
                                            ) : (
                                                <div className='text-center'>Nenhuma refeição cadastrada</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoricoPage;
