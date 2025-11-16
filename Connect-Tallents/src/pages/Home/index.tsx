import Background from "../../components/Background/Background";
import CardNeon from "../../components/CardNeon/CardNeon";

export default function Home() {
    return (
        <main className="home-container">
            
            <Background/>

            <h1 className="home-titulo">Conheça a Connect Tallents</h1>

            {/* Texto explicativo */}
            <p className="home-descricao">
                Explore as principais funcionalidades da plataforma.
                Escolha uma das opções abaixo para navegar por nossos serviços
                e descobrir tudo o que a Connect Tallents pode oferecer.
            </p>

            {/* Cards */}
            <div className="home-cards">

                <CardNeon
                    titulo="Titulo 1"
                    texto="Página 1"
                    link="/error"
                />

                <CardNeon
                    titulo="Titulo 2"
                    texto="Página 2"
                    link="/"
                />

                <CardNeon
                    titulo="Titulo 3"
                    texto="Página 3"
                    link="/"
                />

                <CardNeon
                    titulo="Titulo 4"
                    texto="Página 4"
                    link="/"
                />

            </div>
        </main>
    );
}
