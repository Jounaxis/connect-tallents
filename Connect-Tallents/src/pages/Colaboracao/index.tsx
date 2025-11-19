import { useEffect, useState } from "react";
import { endpoints } from "../../services/endpoint";
import { Usuario, Projeto, Tarefa, Colaboracao } from "../../types/Dominio";

import UsersSideBar from "../../components/UsersSideBar/UsersSideBar";
import Tendencias from "../../components/Tendencias/Tendencias";
import CardProjeto from "../../components/CardProjeto/CardProjeto";
import Carregamento from "../../components/Carregamento/Carregamento";
import BackgroundNeon from "../../components/Background/Background";
import ProjetoModal from "../../components/ModalProjeto/ModalProjeto";

export default function Colaboracao() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    const [carregando, setCarregando] = useState(true);

    const [modalAberto, setModalAberto] = useState(false);
    const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto | null>(null);

    async function abrirDetalhes(projeto: Projeto) {
        setProjetoSelecionado(projeto);
        setModalAberto(true);

        const listaTarefas = await endpoints.listarTarefas();
        const tarefasDoProjeto = listaTarefas.filter(
            (t) => t.codigoProjeto === projeto.codigo
        );

        setTarefas(tarefasDoProjeto);
    }

    useEffect(() => {
        async function carregar() {
            try {
                setCarregando(true);

                const listaUsuarios = await endpoints.listarUsuarios();
                const listaProjetos = await endpoints.listarProjetos();
                const listaColab = await endpoints.listarColaboracoes();

                setUsuarios(listaUsuarios);

                const mapaUsuarios: Record<number, Usuario> = {};
                listaUsuarios.forEach((u) => {
                    mapaUsuarios[u.codigo] = u;
                });

                const mapaColab: Record<number, Colaboracao> = {};
                listaColab.forEach((c) => {
                    mapaColab[c.idProjeto] = c;
                });
                
                const projetosFormatados = listaProjetos.map((proj) => ({
                    ...proj,
                    usuario: mapaUsuarios[proj.codigoUsuario] || null,
                    colaboracao: mapaColab[proj.codigo] || null
                }));

                setProjetos(projetosFormatados);

            } finally {
                setCarregando(false);
            }
        }

        carregar();
    }, []);

    return (
        <main className="global-container">
            <BackgroundNeon />

            <h1 className="global-titulo">Projetos Colaborativos</h1>

            <div className="global-layout">

                <UsersSideBar usuario={usuarios} />

                <div className="colab-feed">
                    {carregando ? (
                        <>
                            <Carregamento />
                            <Carregamento />
                            <Carregamento />
                        </>
                    ) : (
                        projetos.map((p) => (
                            <CardProjeto
                                key={p.codigo}
                                projeto={p}
                                onVerDetalhes={() => abrirDetalhes(p)}
                            />
                        ))
                    )}
                </div>

                <Tendencias />
            </div>

            <ProjetoModal
                open={modalAberto}
                projeto={projetoSelecionado}
                tarefas={tarefas}
                onClose={() => setModalAberto(false)}
            />
        </main>
    );
}
