type CardIntegranteProps = {
    nome: string;
    rm: string;
    turma: string;
    foto: string;
    github: string;
    linkedin: string;
};

export default function CardIntegrante({
    nome,
    rm,
    turma,
    foto,
    github,
    linkedin,
}: CardIntegranteProps) {

    return (
        <div className="card-integrante">

            {/* FOTO */}
            <img src={foto} alt={nome} className="card-integrante-foto" />

            {/* CONTEÚDO */}
            <div className="card-integrante-conteudo">
                <h2 className="card-integrante-nome">{nome}</h2>

                <p className="card-integrante-info">RM: {rm}</p>
                <p className="card-integrante-info">Turma: {turma}</p>

                {/* LINKS */}
                <div className="card-integrante-links">
                    <a href={github} target="_blank" className="card-integrante-link">
                        GitHub
                    </a>

                    <a href={linkedin} target="_blank" className="card-integrante-link">
                        LinkedIn
                    </a>
                </div>
            </div>

        </div>
    );
}
