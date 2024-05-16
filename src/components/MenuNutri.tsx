import LogoutButton from "@/utils/logoutButton/logoutButton";
import Link from "next/link";
import Image from "next/image";

export default function MenuNutri() {

    return (
        <div>
            <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
            <div className=" flex h-svh flex-row bg-cor1">
                <div className="flex flex-col bg-gray-100">
                    <div className="flex items-center justify-center shadow-md bg-white p-4">
                        <a href="../nutricionista/">
                            <Image src={"/logo-menor.png"} alt="logo cantina tech" width={96} height={96} />
                        </a>
                    </div>
                    <div className="h-svh flex flex-col justify-between w-56 bg-white overflow-hidden">
                        <ul className="flex flex-col py-1">
                            <li>
                                <a href="../nutricionista/" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-search-alt"></i></span>
                                    <span className="text-sm font-medium">Produtos em estoque</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-book-alt"></i></span>
                                    <span className="text-sm font-medium">Produtos usados</span>
                                </a>
                            </li>
                            <li>
                                <Link href="../nutricionista/cadastrar-produtos/" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className='bx bx-plus'></i></span>
                                    <span className="text-sm font-medium">Cadastro de produtos</span>
                                </Link>
                            </li>
                            <li>
                                <a href="../nutricionista/cadastrar-refeicao/" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-dish"></i></span>
                                    <span className="text-sm font-medium">Cadastro de refeições</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className='bx bx-book-reader'></i></span>
                                    <span className="text-sm font-medium">Histórico de refeições</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}