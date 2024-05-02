'use client'
import useCadastrarRefeicoesController from "@/utils/forms/cadastrar-refeicoes/cadastrarRefeicoesForm";

export default function cadastrarRefeicoesForm() {

    // Função para gerar um número específico de campos do formulário
    const renderizarCampos = (quantidade:any) => {
        const campos = [];
        for (let i = 0; i < quantidade; i++) {
            campos.push(
                <div key={i} className="flex flex-row gap-8 h-fit w-full px-16 py-4">
                   
                    {/* Tipo */}
                    <div className="flex flex-col gap-1 w-30">
                        <label htmlFor={`quantidade-${i}`}>Nome</label>
                        <input
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600"
                            placeholder="INSIRA O NOME"
                        />
                    </div>
                     {/* Quantidade */}
                     <div className="flex flex-col gap-1 w-24">
                        <label htmlFor={`quantidade-${i}`}>Alunos</label>
                        <input
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600"
                            placeholder="1"
                        />
                    </div>
                                       {/* Classificacao */}
                                       <div className="flex flex-col gap-1">
                        <label htmlFor={`classificacao-${i}`}>Ingredientes</label>
                        <select
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                            id={`classificacao-${i}`}
                            name={`classificacao-${i}`}
                        >
                            <option selected hidden>CEBOLA</option>
                            <option value="embalagem">CEBOLA</option>
                            <option value="kg">PIMENTA</option>
                            <option value="frasco">ARROZ</option>
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
                            placeholder="3g"
                        />
                    </div>

 
                </div>
            );
        }
        return campos;
    };

    return (
        <div className="flex flex-col items-center h-svh py-10">
            <h1 className="text-cor3 font-medium uppercase"></h1>
            
            {renderizarCampos(4)} {/* Chama a função para renderizar 5 conjuntos de campos */}
        </div>
    );
}
