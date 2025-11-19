import { Usuario } from "../../types/Dominio";
import GenericAvatar from "../AvatarGenerico/AvatarGenerico";

type AvaliacaoUI = {
    nota?: number;
    comentario?: string;
    dataAvaliacao?: string;
    idProjeto?: number;
    usuario?: Usuario | null;
    [key: string]: any;
};

type Props = {
    avaliacao: AvaliacaoUI;
};

export default function CardAvaliacao({ avaliacao }: Props) {
    const usuario = avaliacao.usuario;

    const nome = usuario?.nome ?? "Usuário Desconhecido";
    const pais = (usuario as any)?.pais ?? "Mundo";
    const tipoUsuario = (usuario as any)?.tipoUsuario ?? "Membro";

    const rawDate =
        avaliacao.dataAvaliacao ??
        (avaliacao as any).data ??
        (avaliacao as any).criadoEm ??
        null;

    const dataFormatada = rawDate
        ? new Date(rawDate).toLocaleDateString("pt-BR")
        : "";

    const nota = avaliacao.nota ?? 0;

    return (
        <article className="experiencia-card">
            <header className="experiencia-header">
                <div className="experiencia-avatar">
                    {usuario?.foto ? (
                        <img src={usuario.foto} alt={nome} />
                    ) : (
                        <GenericAvatar />
                    )}
                </div>

                <div className="experiencia-header-info">
                    <span className="experiencia-user-name">{nome}</span>
                    <span className="experiencia-user-details">
                        {pais} · {tipoUsuario}
                    </span>
                    {dataFormatada && (
                        <span className="experiencia-date">{dataFormatada}</span>
                    )}
                </div>

                <div className="experiencia-avaliacao">
                    <span className="nota">{nota.toFixed(1)}</span>
                    <p>avaliação do projeto {avaliacao.idProjeto}</p>
                </div>
            </header>

            <p className="experiencia-content">{avaliacao.comentario}</p>
        </article>
    );
}
