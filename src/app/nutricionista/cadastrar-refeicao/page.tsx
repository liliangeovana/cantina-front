import MenuNutri from "@/components/MenuNutri";
import CadastrarRefeicoesForm from "@/utils/forms/cadastrar-refeicoes/cadastrarRefeicoesForm";

export default function cadastrarProdutos() {
    return (
        <div>
            <title>Cantina Tech | Cadastrar Refeição</title>
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