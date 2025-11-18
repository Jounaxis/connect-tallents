type ProjetoModalProps = {
    open: boolean;
    projeto: any | null;
    tarefas: any[];
    onClose: () => void;
};

export default function ProjetoModal({
    open,
    projeto,
    tarefas,
    onClose,
}: ProjetoModalProps) {
    if (!open || !projeto) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>

                {/* TÍTULO */}
                <h2 className="modal-titulo">{projeto.conteudo}</h2>
                <p className="modal-sub">
                    Responsável: {projeto.usuario?.nome}
                </p>

                {/* LISTA DE TAREFAS */}
                <h3 className="modal-sec-titulo">Tarefas</h3>

                {tarefas.length === 0 ? (
                    <p className="modal-vazio">Nenhuma tarefa cadastrada.</p>
                ) : (
                    <div className="tarefa-lista">
                        {tarefas.map((t) => (
                            <div key={t.codigo} className="tarefa-item">
                                <h4>{t.nome}</h4>
                                <p>{t.descricaoTarefa}</p>
                                <span>Status: {t.status}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* BOTÃO FECHAR */}
                <button className="modal-fechar" onClick={onClose}>
                    Fechar
                </button>
            </div>
        </div>
    );
}
