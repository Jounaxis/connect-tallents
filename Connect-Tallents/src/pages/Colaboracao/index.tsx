import { useEffect, useState } from "react";
import { endpoints } from "../../services/endpoint";
import { useAuth } from "../../context/AuthContext";
import { Usuario, ProjetoComRelacionamentos, Tarefa, Colaboracao, Projeto, StatusTarefa, STATUS_TAREFA } from "../../types/Dominio";

import UsersSideBar from "../../components/UsersSideBar/UsersSideBar";
import Tendencias from "../../components/Tendencias/Tendencias";
import CardProjeto from "../../components/CardProjeto/CardProjeto";
import Carregamento from "../../components/Carregamento/Carregamento";
import BackgroundNeon from "../../components/Background/Background";
import ProjetoModal from "../../components/ModalProjeto/ModalProjeto";
import CriarProjeto from "../../components/CriarProjeto/CriarProjeto";
import ProjetoDetalhes from "../../components/ProjetoDetalhes/ProjetoDetalhes";

export default function Colaboracao() {
    const { usuario } = useAuth();
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [projetos, setProjetos] = useState<ProjetoComRelacionamentos[]>([]);
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    const [carregando, setCarregando] = useState(true);

    const [novoProjeto, setNovoProjeto] = useState("");
    const [criandoProjeto, setCriandoProjeto] = useState(false);
    const [erroCriar, setErroCriar] = useState("");
    const [erroAcao, setErroAcao] = useState("");
    const [mensagemAcao, setMensagemAcao] = useState("");
    const [alterandoId, setAlterandoId] = useState<number | null>(null);
    const [excluindoId, setExcluindoId] = useState<number | null>(null);
    const [confirmandoExclusaoId, setConfirmandoExclusaoId] = useState<number | null>(null);
    const [projetoEditando, setProjetoEditando] = useState<ProjetoComRelacionamentos | null>(null);
    const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);
    const [detalheForm, setDetalheForm] = useState({
        nome: "",
        descricaoTarefa: "",
        area: "",
        status: STATUS_TAREFA[0] as StatusTarefa,
        dataCriacao: new Date().toISOString().split("T")[0],
        dataConclusao: "",
    });

    const [modalAberto, setModalAberto] = useState(false);
    const [projetoSelecionado, setProjetoSelecionado] = useState<ProjetoComRelacionamentos | null>(null);

    async function abrirDetalhes(projeto: ProjetoComRelacionamentos) {
        setProjetoSelecionado(projeto);
        setModalAberto(true);

        const listaTarefas = await endpoints.listarTarefas();
        const tarefasDoProjeto = listaTarefas.filter(
            (t) => t.codigoProjeto === projeto.codigo
        );

        setTarefas(tarefasDoProjeto);
    }

    async function criarProjeto() {
        if (!usuario?.id) {
            setErroCriar("Faca login para criar um projeto.");
            return;
        }

        if (!novoProjeto.trim()) {
            setErroCriar("De um nome ao projeto.");
            return;
        }

        try {
            setCriandoProjeto(true);
            setErroCriar("");
            setErroAcao("");

            const payload: Partial<Projeto> = {
                conteudo: novoProjeto.trim(),
                codigoUsuario: usuario.id,
                idUsuario: usuario.id, 
                dataEntrada: new Date().toISOString().split("T")[0],
            };

            const criado = await endpoints.criarProjeto(payload);
            const autor = usuarios.find((u) => u.codigo === usuario.id) || null;
            const novo: ProjetoComRelacionamentos = {
                ...criado,
                usuario: autor,
                colaboracao: null,
            };

            setProjetos((prev) => [novo, ...prev]);
            setNovoProjeto("");
        } catch (error) {
            console.error("Erro ao criar projeto:", error);
            const detalhe = error instanceof Error ? error.message : "";
            setErroCriar(detalhe || "Nao foi possivel criar o projeto agora.");
        } finally {
            setCriandoProjeto(false);
        }
    }

    const ehDoUsuario = (projeto: ProjetoComRelacionamentos) =>
        !!usuario?.id && (projeto.codigoUsuario === usuario.id || projeto.idUsuario === usuario.id);

    function normalizarData(valor: string) {
        if (!valor) return "";
        if (valor.includes("/")) {
            const [dia, mes, ano] = valor.split("/");
            if (dia && mes && ano) return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
        }
        return valor;
    }

    function dataIsoCurta(valor: string) {
        const normalizada = normalizarData(valor);
        if (!normalizada) return "";
        const d = new Date(normalizada);
        if (Number.isNaN(d.getTime())) return normalizada;
        // formato yyyy-MM-dd
        const ano = d.getUTCFullYear();
        const mes = String(d.getUTCMonth() + 1).padStart(2, "0");
        const dia = String(d.getUTCDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    function formatarParaInput(data: string | null | undefined) {
        if (!data) return "";
        if (data.includes("T")) {
            return new Date(data).toISOString().split("T")[0];
        }
        return data;
    }

    function solicitarExclusao(projeto: ProjetoComRelacionamentos) {
        if (!ehDoUsuario(projeto)) return;
        setConfirmandoExclusaoId(projeto.codigo);
        setErroAcao("");
        setMensagemAcao("");
    }

    function abrirEdicao(projeto: ProjetoComRelacionamentos) {
        if (!ehDoUsuario(projeto)) return;
        async function preparar() {
            setProjetoEditando(projeto);
            setTarefaEditando(null);
            setDetalheForm({
                nome: "",
                descricaoTarefa: "",
                area: "",
                status: STATUS_TAREFA[0],
                dataCriacao: new Date().toISOString().split("T")[0],
                dataConclusao: "",
            });
            setErroAcao("");
            setMensagemAcao("");
            const listaTarefas = await endpoints.listarTarefas();
            const doProjeto = listaTarefas.filter((t) => t.codigoProjeto === projeto.codigo);
            setTarefas(doProjeto);
            setTimeout(() => {
                const alvo = document.getElementById("form-detalhes-projeto");
                alvo?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 0);
        }
        preparar();
    }

    function editarTarefaExistente(tarefa: Tarefa) {
        setTarefaEditando(tarefa);
        setDetalheForm({
            nome: tarefa.nome,
            descricaoTarefa: tarefa.descricaoTarefa,
            area: tarefa.area,
            status: (tarefa.status as StatusTarefa) || STATUS_TAREFA[0],
            dataCriacao: formatarParaInput(tarefa.dataCriacao) || new Date().toISOString().split("T")[0],
            dataConclusao: formatarParaInput(tarefa.dataConclusao || undefined),
        });
        setErroAcao("");
        setMensagemAcao("");
        const alvo = document.getElementById("form-detalhes-projeto");
        alvo?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function cancelarEdicao() {
        setProjetoEditando(null);
        setTarefaEditando(null);
        setDetalheForm({
            nome: "",
            descricaoTarefa: "",
            area: "",
            status: STATUS_TAREFA[0],
            dataCriacao: new Date().toISOString().split("T")[0],
            dataConclusao: "",
        });
        setAlterandoId(null);
    }

    async function salvarDetalhes() {
        if (!projetoEditando) return;
        try {
            setAlterandoId(projetoEditando.codigo);
            setErroAcao("");
            const statusPayload = detalheForm.status;
            const dataCriacaoIso = dataIsoCurta(detalheForm.dataCriacao);
            const hojeIso = new Date().toISOString().split("T")[0];
            if (dataCriacaoIso > hojeIso) {
                setErroAcao("A data de criacao nao pode ser futura.");
                setAlterandoId(null);
                return;
            }

            const payload: Partial<Tarefa> = {
                nome: detalheForm.nome.trim(),
                descricaoTarefa: detalheForm.descricaoTarefa.trim(),
                area: detalheForm.area.trim(),
                status: statusPayload,
                dataCriacao: dataCriacaoIso,
                dataConclusao: detalheForm.dataConclusao ? dataIsoCurta(detalheForm.dataConclusao) : null,
                codigoProjeto: projetoEditando.codigo,
            };
            if (!payload.nome || !payload.descricaoTarefa) {
                setErroAcao("Preencha nome e descricao.");
                setAlterandoId(null);
                return;
            }
            if (tarefaEditando) {
                const atualizada = await endpoints.atualizarTarefa(tarefaEditando.codigo, payload);
                setTarefas((prev) =>
                    prev.map((t) =>
                        t.codigo === tarefaEditando.codigo
                            ? { ...t, ...atualizada }
                            : t
                    )
                );
                setMensagemAcao("Tarefa atualizada com sucesso.");
                setTarefaEditando(null);
            } else {
                const criada = await endpoints.criarTarefa(payload);
                setMensagemAcao("Detalhes adicionados ao projeto.");
                if (projetoEditando?.codigo) {
                    const novaTarefa: Tarefa = {
                        codigo: (criada as any)?.codigo ?? Date.now(),
                        nome: (criada as any)?.nome ?? (payload.nome as string),
                        descricaoTarefa: (criada as any)?.descricaoTarefa ?? (payload.descricaoTarefa as string),
                        status: (criada as any)?.status ?? (payload.status as StatusTarefa),
                        area: (criada as any)?.area ?? (payload.area as string),
                        dataCriacao: (criada as any)?.dataCriacao ?? (payload.dataCriacao as string),
                        dataConclusao: (criada as any)?.dataConclusao ?? payload.dataConclusao ?? null,
                        codigoProjeto: (criada as any)?.codigoProjeto ?? projetoEditando.codigo,
                    };
                    setTarefas((prev) => [...prev, novaTarefa]);
                }
            }
            cancelarEdicao();
        } catch (error) {
            console.error("Erro ao salvar detalhes:", error);
            const detalhe = error instanceof Error ? error.message : "";
            setErroAcao(detalhe || "Nao foi possivel salvar os detalhes.");
        } finally {
            setAlterandoId(null);
        }
    }

    async function excluirProjeto(projeto: ProjetoComRelacionamentos) {
        if (!ehDoUsuario(projeto)) return;

        try {
            setExcluindoId(projeto.codigo);
            setErroAcao("");
            const [tarefasDoProjeto, colabs, mensagens, avaliacoes] = await Promise.all([
                endpoints.listarTarefas(),
                endpoints.listarColaboracoes(),
                endpoints.listarMensagens(),
                endpoints.listarAvaliacoes(),
            ]);
            const tarefasParaExcluir = tarefasDoProjeto.filter(
                (t) => t.codigoProjeto === projeto.codigo
            );
            for (const tarefa of tarefasParaExcluir) {
                await endpoints.deletarTarefa(tarefa.codigo);
            }
            const colabsParaExcluir = colabs.filter(
                (c) => c.idProjeto === projeto.codigo
            );
            for (const c of colabsParaExcluir) {
                await endpoints.deletarColaboracao(c.codigo);
            }
            const mensagensParaExcluir = mensagens.filter(
                (m) => m.idProjeto === projeto.codigo
            );
            for (const m of mensagensParaExcluir) {
                await endpoints.deletarMensagem(m.codigo);
            }
            const avaliacoesParaExcluir = avaliacoes.filter(
                (a) => a.idProjeto === projeto.codigo
            );
            for (const a of avaliacoesParaExcluir) {
                await endpoints.deletarAvaliacao(a.codigo as number);
            }
            await endpoints.deletarProjeto(projeto.codigo);
            setProjetos((prev) => prev.filter((p) => p.codigo !== projeto.codigo));
            setMensagemAcao("Projeto excluido com sucesso.");
        } catch (error) {
            console.error("Erro ao excluir projeto:", error);
            const detalhe = error instanceof Error ? error.message : "";
            setErroAcao(detalhe || "Nao foi possivel excluir o projeto.");
        } finally {
            setExcluindoId(null);
            setConfirmandoExclusaoId(null);
        }
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
                    <CriarProjeto
                        value={novoProjeto}
                        onChange={setNovoProjeto}
                        onSubmit={criarProjeto}
                        loading={criandoProjeto}
                        disabled={!usuario}
                        error={erroCriar}
                    />

                    {projetoEditando && (
                        <div id="form-detalhes-projeto">
                    <ProjetoDetalhes
                        value={detalheForm}
                        onChange={(campo, valor) => setDetalheForm((prev) => ({ ...prev, [campo]: valor }))}
                        onSave={salvarDetalhes}
                        onCancel={cancelarEdicao}
                        saving={alterandoId === projetoEditando.codigo}
                        error={erroAcao}
                    />
                            <div className="faq-lista mt-4">
                                <p className="faq-pergunta">Tarefas do projeto</p>
                                {tarefas.length === 0 && <p className="faq-resposta">Nenhuma tarefa cadastrada ainda.</p>}
                                {tarefas
                                    .filter((t) => t.codigoProjeto === projetoEditando.codigo)
                                    .map((t) => (
                                        <div key={t.codigo} className="faq-item">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="faq-pergunta">{t.nome}</p>
                                                    <p className="faq-resposta text-sm">{t.descricaoTarefa}</p>
                                                </div>
                                                <button
                                                    className="btn-detalhes"
                                                    type="button"
                                                    onClick={() => editarTarefaExistente(t)}
                                                >
                                                    Editar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {mensagemAcao && <p className="form-success mb-2">{mensagemAcao}</p>}
                    {erroAcao && <p className="form-error mb-3">{erroAcao}</p>}

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
                                podeEditar={ehDoUsuario(p)}
                                alterando={alterandoId === p.codigo}
                                excluindo={excluindoId === p.codigo}
                                confirmandoExclusao={confirmandoExclusaoId === p.codigo}
                                onEditar={() => abrirEdicao(p)}
                                onExcluir={() => solicitarExclusao(p)}
                                onConfirmarExclusao={() => excluirProjeto(p)}
                                onCancelarExclusao={() => setConfirmandoExclusaoId(null)}
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
                podeEditar={projetoSelecionado ? ehDoUsuario(projetoSelecionado) : false}
                onEditarTarefa={(t) => {
                    if (!projetoSelecionado) return;
                    setProjetoEditando(projetoSelecionado);
                    editarTarefaExistente(t);
                    setModalAberto(false);
                }}
                onClose={() => setModalAberto(false)}
            />
        </main>
    );
}
