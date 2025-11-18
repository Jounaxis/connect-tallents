import { FiThumbsUp, FiMessageCircle, FiShare2 } from "react-icons/fi";

type PostItemProps = {
    post: any;
};

export default function PostItem({ post }: PostItemProps) {
    const usuario = post.usuario;

    return (
        <article className="post-item">

            {/* Header do Post */}
            <header className="post-header">
                <img
                    src={
                        usuario?.foto ||
                        `https://api.dicebear.com/7.x/bottts/svg?seed=${usuario?.nome || "user"}`
                    }
                    alt={usuario?.nome}
                    className="post-avatar"
                />

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
            </header>

            {/* Conteúdo */}
            <p className="post-content">{post.conteudo}</p>

            {/* Ações */}
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
