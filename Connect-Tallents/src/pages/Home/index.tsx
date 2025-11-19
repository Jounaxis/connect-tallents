import Background from "../../components/Background/Background";
import CardNeon from "../../components/CardNeon/CardNeon";

import { FiGlobe, FiUsers, FiBriefcase, FiTarget } from "react-icons/fi";

export default function Home() {
    return (
        <main className="home-container">

            <Background />

            <h1 className="home-titulo">Conheça a Connect Tallents</h1>

            <p className="home-descricao">
                Explore as principais funcionalidades da plataforma.
                Escolha uma das opções abaixo para navegar por nossos serviços
                e descobrir tudo o que a Connect Tallents pode oferecer.
            </p>

            <div className="home-cards">

                <CardNeon
                    titulo="Global"
                    texto="Conecte-se com profissionais de diferentes países e culturas"
                    link="/global"
                    icon={<FiGlobe />}
                />

                <CardNeon
                    titulo="Colaboração"
                    texto="Trabalhe remotamente em projetos reais com equipes diversas"
                    link="/colaboracao"
                    icon={<FiUsers />}
                />

                <CardNeon
                    titulo="Experiência"
                    texto="Troque vivências e aprenda com profissionais ao redor do mundo"
                    link="/experiencia"
                    icon={<FiBriefcase />}
                />

                <CardNeon
                    titulo="Preparação"
                    texto="Prepare-se para o mercado de trabalho com projetos práticos"
                    link="/preparacao"
                    icon={<FiTarget />}
                />

            </div>
        </main>
    );
}
