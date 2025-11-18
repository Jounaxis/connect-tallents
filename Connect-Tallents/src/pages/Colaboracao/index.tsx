import { useEffect, useState } from "react";
import { endpoints } from "../../services/endpoint";
import { Usuario, Colaboracao } from "../../services/connect";

import UsersSideBar from "../../components/UsersSideBar/UsersSideBar";
import Tendencias from "../../components/Tendencias/Tendencias";
import CardProjeto from "../../components/CardProjeto/CardProjeto";
import Carregamento from "../../components/Carregamento/Carregamento";
import BackgroundNeon from "../../components/Background/Background";
import ProjetoModal from "../../components/ModalProjeto/ModalProjeto";

export default function Colaboracao() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [projetos, setProjetos] = useState<any[]>([]);
    const [tarefas, setTarefas] = useState<any[]>([]);

    const [carregando, setCarregando] = useState(true);

    // === MODAL ===
    const [modalAberto, setModalAberto] = useState(false);
    const [projetoSelecionado, setProjetoSelecionado] = useState<any | null>(null);

    // === ABRIR MODAL ===
    async function abrirDetalhes(projeto: any) {
        setProjetoSelecionado(projeto);
        setModalAberto(true);

        const listaTarefas = await endpoints.listarTarefas();
        const tarefasDoProjeto = listaTarefas.filter(
            (t: any) => t.codigoProjeto === projeto.codigo
        );

        setTarefas(tarefasDoProjeto);
    }

    // === CARREGAR DADOS ===
    useEffect(() => {
        async function carregar() {
            try {
                setCarregando(true);

                const listaUsuarios = await endpoints.listarUsuarios() as Usuario[];
                const listaProjetos = await endpoints.listarProjetos();
                const listaColab = await endpoints.listarColaboracoes() as Colaboracao[];

                setUsuarios(listaUsuarios);

                const mapaUsuarios: Record<number, Usuario> = {};
                listaUsuarios.forEach((u) => {
                    mapaUsuarios[u.codigo] = u;
                });

                const mapaColab: Record<number, Colaboracao> = {};
                listaColab.forEach((c) => {
                    mapaColab[c.idProjeto] = c;
                });
                
                const projetosFormatados = listaProjetos.map((proj: any) => ({
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

                {/* SIDEBAR */}
                <UsersSideBar usuarios={usuarios} />

                {/* FEED DE PROJETOS */}
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

                {/* TENDÊNCIAS */}
                <Tendencias />
            </div>

            {/* MODAL */}
            <ProjetoModal
                open={modalAberto}
                projeto={projetoSelecionado}
                tarefas={tarefas}
                onClose={() => setModalAberto(false)}
            />
        </main>
    );
}
