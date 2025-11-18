// src/components/ExperienciaCard/ExperienciaCard.tsx

type Props = {
    experiencia: any;
};

export default function CardExperiencia({ experiencia }: Props) {
    const usuario = experiencia.usuario;

    return (
        <div className="experiencia-card">

            <div className="experiencia-header">
                <img className="experiencia-avatar" />
                <div className="experiencia-header-info">
                    <span className="experiencia-user-name">{usuario?.nome}</span>
                    <span className="experiencia-user-details">
                        {usuario?.pais} • {usuario?.tipoUsuario}
                    </span>
                    <span className="experiencia-date">
                        {new Date(experiencia.dataEnvio).toLocaleDateString("pt-BR")}
                    </span>
                </div>
            </div>

            <p className="experiencia-content">{experiencia.conteudo}</p>

            {experiencia.avaliacao && (
                <div className="experiencia-avaliacao">
                    <span className="nota">⭐ {experiencia.avaliacao.ntAvaliacao}</span>
                    <p>“{experiencia.avaliacao.dsComentario}”</p>
                </div>
            )}

        </div>

    );
}
