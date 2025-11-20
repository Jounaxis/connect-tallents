import { ProjetoComRelacionamentos } from "../../types/Dominio";
import { Link } from "react-router-dom";

type Props = {
    projeto: ProjetoComRelacionamentos;
    onVerDetalhes: (projeto: ProjetoComRelacionamentos) => void;
}

export default function CardProjeto({ projeto, onVerDetalhes }: Props) {
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

            <Link
                to={`/projeto/${projeto.codigo}`}
                className="btn-detalhes mt-2 inline-block text-center"
            >
                Abrir página do projeto
            </Link>
        </div>
    );
}
