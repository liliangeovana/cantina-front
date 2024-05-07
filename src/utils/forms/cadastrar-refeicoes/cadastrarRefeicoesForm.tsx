'use client'

export default function cadastrarRefeicoesForm() {
    return (
        <div>
          <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
          <div className="flex flex-row">
          </div>
                      <div className="text-center p-8 uppercase text-cor3 font-semibold">
                          <h2>Cadastro de Refeição</h2>
                      </div>
                      
                      <div className="grid grid-cols-5 text-center gap-4 p-2 overflow-auto">
                        <div className="flex flex-col gap-5">
                          <h3 className="font-semibold">Refeição</h3>
                          <div className="flex flex-col gap-3 m-auto">
                
                                <div  className="w-44">
                                <input
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600"
                            placeholder="INSIRA O NOME"
                        />
                        </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5">
                          <h3 className="font-semibold">Total de Alunos</h3>
                          <div className="flex flex-col gap-3 m-auto">
                          <input
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                            placeholder="1"
                        />
                          </div>
                        </div>
                        <div className="flex flex-col gap-5">
                          <h3 className="font-semibold">Ingredientes</h3>
                          <div className="flex flex-col gap-3 m-auto">

                          <select
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                        >
                            <option selected hidden>CEBOLA</option>
                            <option value="embalagem">CEBOLA</option>
                            <option value="kg">PIMENTA</option>
                            <option value="frasco">ARROZ</option>
                        </select>
                        </div>
                        </div>
                        <div className="flex flex-col gap-5">
                          <h3 className="font-semibold">Quantidade</h3>
                          <div className="flex flex-col gap-3 m-auto">
                          <input
                            className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                            placeholder="3 GRAMAS"
                        />
                          </div>

                        </div>

                    </div>
                    <div className="text-left ml-11 mt-4 mx-auto p-8 uppercase text-black font-semibold">
                          <h2>Descrição de preparo</h2>
                         <label >
                            <textarea rows={20} cols={50}/>
                        </label>  
                        </div> 
                        <div className="text-center ml-20 mt-4 mx-auto p-8 uppercase text-black font-semibold">
                        <button
                    className={"w-80 p-2 mt-8 border bg-cor4 border-gray-300 hover:bg-green-600 text-white rounded-lg focus:outline-none focus:border-gray-600 "}>Enviar
                </button>
                </div>

        </div>
      );
    };
    