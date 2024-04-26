import MenuNutri from "@/components/MenuNutri";
import CadastrarProdutosForm from "@/utils/forms/cadastrar-produtos/cadastrarProdutosForm";

export default function cadastrarProdutos() {
    return (
        <div>
            <title>Cantina Tech | Cadastrar produtos</title>
            <div className="flex flex-row">
                <section>
                    <MenuNutri />
                </section>
                <section className="w-full">
                    <CadastrarProdutosForm />
                </section>
            </div>
        </div>
    )
}