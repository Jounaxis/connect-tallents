import { Projeto, Tarefa } from "../../types/Dominio";

type ProjetoModalProps = {
    open: boolean;
    projeto: Projeto | null;
    tarefas: Tarefa[];
    onClose: () => void;
    podeEditar?: boolean;
    onEditarTarefa?: (tarefa: Tarefa) => void;
};

export default function ProjetoModal({
    open,
    projeto,
    tarefas,
    onClose,
    podeEditar = false,
    onEditarTarefa,
}: ProjetoModalProps) {
    if (!open || !projeto) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>

                <h2 className="modal-titulo">{projeto.conteudo}</h2>
                <p className="modal-sub">
                    Responsável: {projeto.usuario?.nome}
                </p>

                <h3 className="modal-sec-titulo">Tarefas</h3>

                {tarefas.length === 0 ? (
                    <p className="modal-vazio">Nenhuma tarefa cadastrada.</p>
                ) : (
                    <div className="tarefa-lista">
                        {tarefas.map((t) => (
                            <div key={t.codigo} className="tarefa-item">
                                <div className="tarefa-header">
                                    <h4>{t.nome}</h4>
                                    {podeEditar && (
                                        <button
                                            className="btn-detalhes"
                                            onClick={() => onEditarTarefa?.(t)}
                                            type="button"
                                        >
                                            Editar
                                        </button>
                                    )}
                                </div>
                                <p>{t.descricaoTarefa}</p>
                                <span>Status: {t.status}</span>
                            </div>
                        ))}
                    </div>
                )}

                <button className="modal-fechar" onClick={onClose}>
                    Fechar
                </button>
            </div>
        </div>
    );
}
