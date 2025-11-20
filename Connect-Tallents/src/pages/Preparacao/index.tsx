import { useEffect, useState } from "react";
import { endpoints } from "../../services/endpoint";
import { Tarefa } from "../../types/Dominio";

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

const filtrosArea = ["TODAS", "Back-End", "Front-End", "Soft Skills"];

export default function Preparacao() {

    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
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

    const tarefasFiltradas = filtroArea === "TODAS"
        ? tarefas
        : tarefas.filter((t) => t.area === filtroArea);

    return (
        <main className="global-container">
            <BackgroundNeon />

            <h1 className="global-titulo">Preparação Profissional</h1>

            <section className="prep-trilhas">
                {trilhas.map((t, i) => (
                    <CardTrilha key={i} titulo={t.titulo} desc={t.desc} />
                ))}
            </section>

            <div className="prep-filtros" aria-label="Filtros por área">
                {filtrosArea.map((filtro) => (
                    <button
                        key={filtro}
                        className={filtroArea === filtro ? "ativo" : ""}
                        onClick={() => setFiltroArea(filtro)}
                    >
                        {filtro === "TODAS" ? "Todas" : filtro}
                    </button>
                ))}
            </div>

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
