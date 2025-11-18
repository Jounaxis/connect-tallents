import { useEffect, useState } from "react";
import { endpoints } from "../../services/endpoint";

import BackgroundNeon from "../../components/Background/Background";
import CardTrilha from "../../components/CardTrilha/CardTrilha";
import CardTarefa from "../../components/CardTarefa/CardTarefa";
import CarregamentoTarefa from "../../components/CarregamentoTarefa/CarregamentoTarefa";

const trilhas = [
    { titulo: "Back-End", desc: "APIs, Banco de Dados, Microsserviços" },
    { titulo: "Front-End", desc: "React, UI/UX, Responsividade" },
    { titulo: "Soft Skills", desc: "Comunicação, Trabalho em Equipe" },
    { titulo: "Carreira", desc: "Entrevistas, Portfólio, Networking" },
];

export default function Preparacao() {

    const [tarefas, setTarefas] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);

    const [filtroArea, setFiltroArea] = useState<string>("TODAS");

    useEffect(() => {
        async function carregar() {
            try {
                setCarregando(true);
                const lista = await endpoints.listarTarefas();
                setTarefas(lista);
            } finally {
                setCarregando(false);
            }
        }
        carregar();
    }, []);

    const tarefasFiltradas = tarefas.filter(t =>
        filtroArea === "TODAS" ? true : t.area === filtroArea
    );

    return (
        <main className="global-container">
            <BackgroundNeon />

            <h1 className="global-titulo">Preparação Profissional</h1>

            {/* → TRILHAS */}
            <section className="prep-trilhas">
                {trilhas.map((t, i) => (
                    <CardTrilha key={i} titulo={t.titulo} desc={t.desc} />
                ))}
            </section>

            {/* → FILTRO */}
            <div className="prep-filtros">
                <button className={filtroArea === "TODAS" ? "ativo" : ""} onClick={() => setFiltroArea("TODAS")}>Todas</button>
                <button className={filtroArea === "Back-End" ? "ativo" : ""} onClick={() => setFiltroArea("Back-End")}>Back-End</button>
                <button className={filtroArea === "Front-End" ? "ativo" : ""} onClick={() => setFiltroArea("Front-End")}>Front-End</button>
                <button className={filtroArea === "Soft Skills" ? "ativo" : ""} onClick={() => setFiltroArea("Soft Skills")}>Soft Skills</button>
            </div>

            {/* → LISTA DE TAREFAS */}
            <section className="prep-tarefas">

                {carregando && (
                    <>
                        <CarregamentoTarefa />
                        <CarregamentoTarefa />
                        <CarregamentoTarefa />
                    </>
                )}

                {!carregando && tarefasFiltradas.map((t) => (
                    <CardTarefa key={t.codigo} tarefa={t} />
                ))}

            </section>

        </main>
    );
}
