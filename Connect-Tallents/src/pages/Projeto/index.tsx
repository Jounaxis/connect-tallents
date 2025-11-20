import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackgroundNeon from "../../components/Background/Background";
import CardTarefa from "../../components/CardTarefa/CardTarefa";
import CarregamentoTarefa from "../../components/CarregamentoTarefa/CarregamentoTarefa";
import { endpoints } from "../../services/endpoint";
import { ProjetoComRelacionamentos, Usuario, Colaboracao, Tarefa } from "../../types/Dominio";

export default function Projeto() {
    const { id } = useParams<{ id: string }>();
    const projetoId = Number(id);

    const [projeto, setProjeto] = useState<ProjetoComRelacionamentos | null>(null);
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(true);

    const tituloPagina = useMemo(() => {
        if (projeto) return `Projeto: ${projeto.conteudo}`;
        if (erro) return "Projeto não encontrado";
        return "Detalhes do Projeto";
    }, [projeto, erro]);

    useEffect(() => {
        if (Number.isNaN(projetoId)) {
            setErro("ID de projeto inválido.");
            setCarregando(false);
            return;
        }

        async function carregar() {
            try {
                setCarregando(true);

                const [usuarios, projetos, colabs, tarefasTudo] = await Promise.all([
                    endpoints.listarUsuarios(),
                    endpoints.listarProjetos(),
                    endpoints.listarColaboracoes(),
                    endpoints.listarTarefas(),
                ]);

                const mapaUsuarios: Record<number, Usuario> = {};
                usuarios.forEach((u) => { mapaUsuarios[u.codigo] = u; });

                const mapaColab: Record<number, Colaboracao> = {};
                colabs.forEach((c) => { mapaColab[c.idProjeto] = c; });

                const encontrado = projetos
                    .map<ProjetoComRelacionamentos>((p) => ({
                        ...p,
                        usuario: mapaUsuarios[p.codigoUsuario] || null,
                        colaboracao: mapaColab[p.codigo] || null,
                    }))
                    .find((p) => p.codigo === projetoId) || null;

                if (!encontrado) {
                    setErro("Projeto não encontrado.");
                }

                setProjeto(encontrado);
                setTarefas(tarefasTudo.filter((t) => t.codigoProjeto === projetoId));
            } catch (e) {
                setErro("Não foi possível carregar este projeto.");
            } finally {
                setCarregando(false);
            }
        }

        carregar();
    }, [projetoId]);

    return (
        <main className="global-container">
            <BackgroundNeon />

            <h1 className="global-titulo">{tituloPagina}</h1>

            {erro && (
                <div className="projeto-card">
                    <p className="text-sm text-red-600 dark:text-red-300 mb-3">{erro}</p>
                    <Link to="/colaboracao" className="btn-detalhes inline-block">Voltar para projetos</Link>
                </div>
            )}

            {carregando && !erro && (
                <section className="prep-tarefas">
                    <CarregamentoTarefa />
                    <CarregamentoTarefa />
                </section>
            )}

            {!carregando && projeto && (
                <article className="projeto-card">
                    <header className="projeto-header">
                        <h2 className="projeto-nome">{projeto.conteudo}</h2>
                        {projeto.usuario && (
                            <p className="projeto-info">
                                {projeto.usuario.nome} — {projeto.usuario.pais}
                            </p>
                        )}
                    </header>

                    {projeto.colaboracao && (
                        <div className="projeto-infos">
                            <span>Função: {projeto.colaboracao.funcao}</span>
                            <span>Entrada: {new Date(projeto.colaboracao.dataEntrada).toLocaleDateString()}</span>
                        </div>
                    )}

                    <div className="projeto-infos">
                        <span>ID: {projeto.codigo}</span>
                        <span>Usuário: {projeto.codigoUsuario}</span>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <Link to="/colaboracao" className="btn-detalhes">Voltar</Link>
                        <Link to="/global" className="btn-detalhes">Ver feed global</Link>
                    </div>
                </article>
            )}

            {!carregando && projeto && (
                <section className="prep-tarefas mt-6">
                    <h3 className="text-lg font-semibold">Tarefas do projeto</h3>
                    {tarefas.length === 0 && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">Nenhuma tarefa vinculada a este projeto.</p>
                    )}
                    {tarefas.map((t) => (
                        <CardTarefa key={t.codigo} tarefa={t} />
                    ))}
                </section>
            )}
        </main>
    );
}
