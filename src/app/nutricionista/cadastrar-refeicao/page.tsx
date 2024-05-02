import MenuNutri from "@/components/MenuNutri";
import CadastrarProdutosForm from "@/utils/forms/cadastrar-refeicoes/cadastrarRefeicoesForm";

export default function cadastrarProdutos() {
    return (
        <div>c
            <title>Cantina Tech | Cadastrar produtos</title>
            <div className="flex flex-row">
                <section>
                    <MenuNutri />
                </section>
                <section className="w-full">
                    <CadastrarRefeicoesForm/>
                </section>
            </div>
        </div>
    )
}