
export default function CardProjeto({ projeto, onVerDetalhes }: any) {
    return (
        <div className="projeto-card">
            <div className="projeto-header">
                <h2 className="projeto-nome">{projeto.conteudo}</h2>

                {projeto.usuario && (
                    <p className="projeto-info">
                        {projeto.usuario.nome} — {projeto.usuario.pais}
                    </p>
                )}
            </div>

            <button
                className="btn-detalhes"
                onClick={() => onVerDetalhes(projeto)}
            >
                Ver Detalhes
            </button>
        </div>
    );
}