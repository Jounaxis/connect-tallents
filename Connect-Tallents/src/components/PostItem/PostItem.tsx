import { FiThumbsUp, FiMessageCircle, FiShare2, FiTrash2 } from "react-icons/fi";
import { MensagemComUsuario } from "../../types/Dominio";
import AvatarGenerico from "../AvatarGenerico/AvatarGenerico";

type PostItemProps = {
    post: MensagemComUsuario;
    podeExcluir?: boolean;
    onExcluir?: (id: number) => void;
};

export default function PostItem({ post, podeExcluir, onExcluir }: PostItemProps) {
    const usuario = post.usuario;

    return (
        <article className="post-item">

            <header className="post-header">
                <div className="post-avatar">
                    {usuario?.foto ? (
                        <img src={usuario.foto} alt={usuario?.nome} />
                    ) : (
                        <AvatarGenerico />
                    )}
                </div>

                <div className="post-header-info">
                    <h3 className="post-user-name">
                        {usuario?.nome || "Usuário Desconhecido"}
                    </h3>

                    <p className="post-user-details">
                        {usuario?.pais || "Mundo"} · {usuario?.tipoUsuario || "Membro"}
                    </p>

                    <span className="post-date">
                        {new Date(post.dataEnvio).toLocaleDateString("pt-BR")}
                    </span>
                </div>
                {podeExcluir && (
                    <button
                        className="post-delete-btn"
                        onClick={() => onExcluir?.(post.codigo)}
                        title="Excluir post"
                        type="button"
                    >
                        <FiTrash2 size={16} />
                    </button>
                )}
            </header>

            <p className="post-content">{post.conteudo}</p>

            <footer className="post-actions">
                <button className="post-button">
                    <FiThumbsUp size={18} />
                    Curtir
                </button>
                <button className="post-button">
                    <FiMessageCircle size={18} />
                    Comentar
                </button>
                <button className="post-button">
                    <FiShare2 size={18} />
                    Compartilhar
                </button>
            </footer>
        </article>
    );
}
