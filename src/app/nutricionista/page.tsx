import Menu from "@/components/MenuNutri";

export default function NutriHomePage(){
    return (
        <div>
            <title>Cantina Tech | Home</title>
            <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
            <div className="flex flex-row">
                <section>
                    <Menu />
                </section>
                <section className="w-full">
                </section>
            </div>
        </div>
    )
}