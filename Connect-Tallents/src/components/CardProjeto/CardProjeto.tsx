import { ProjetoComRelacionamentos } from "../../types/Dominio";
import { Link } from "react-router-dom";

type Props = {
    projeto: ProjetoComRelacionamentos;
    onVerDetalhes: (projeto: ProjetoComRelacionamentos) => void;
    podeEditar?: boolean;
    alterando?: boolean;
    excluindo?: boolean;
    confirmandoExclusao?: boolean;
    onEditar?: (projeto: ProjetoComRelacionamentos) => void;
    onExcluir?: (projeto: ProjetoComRelacionamentos) => void;
    onConfirmarExclusao?: (projeto: ProjetoComRelacionamentos) => void;
    onCancelarExclusao?: (projeto: ProjetoComRelacionamentos) => void;
};

export default function CardProjeto({
    projeto,
    onVerDetalhes,
    podeEditar = false,
    alterando = false,
    excluindo = false,
    confirmandoExclusao = false,
    onEditar,
    onExcluir,
    onConfirmarExclusao,
    onCancelarExclusao,
}: Props) {
    return (
        <div className="projeto-card">
            <div className="projeto-header">
                <h2 className="projeto-nome">{projeto.conteudo}</h2>

                {projeto.usuario && (
                    <p className="projeto-info">
                        {projeto.usuario.nome} - {projeto.usuario.pais}
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
                Abrir pagina do projeto
            </Link>

            {podeEditar && (
                <div className="projeto-actions mt-2 gap-2 flex flex-col">
                    <button
                        className="btn-detalhes"
                        onClick={() => onEditar?.(projeto)}
                        disabled={alterando || excluindo}
                    >
                        {alterando ? "Salvando..." : "Adicionar detalhes"}
                    </button>
                    <div className="flex gap-2">
                        <button
                            className="btn-detalhes danger"
                            onClick={() =>
                                confirmandoExclusao
                                    ? onConfirmarExclusao?.(projeto)
                                    : onExcluir?.(projeto)
                            }
                            disabled={excluindo || alterando}
                        >
                            {excluindo
                                ? "Excluindo..."
                                : confirmandoExclusao
                                    ? "Confirmar exclusao"
                                    : "Excluir projeto"}
                        </button>
                        {confirmandoExclusao && (
                            <button
                                className="btn-detalhes"
                                onClick={() => onCancelarExclusao?.(projeto)}
                                disabled={excluindo || alterando}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
