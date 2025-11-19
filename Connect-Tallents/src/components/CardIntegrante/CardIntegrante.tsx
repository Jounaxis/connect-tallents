import { CardIntegranteProps } from "../../types/CardIntegranteProps";

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

            <img src={foto} alt={nome} className="card-integrante-foto" />

            <div className="card-integrante-conteudo">
                <h2 className="card-integrante-nome">{nome}</h2>

                <p className="card-integrante-info">RM: {rm}</p>
                <p className="card-integrante-info">Turma: {turma}</p>

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
