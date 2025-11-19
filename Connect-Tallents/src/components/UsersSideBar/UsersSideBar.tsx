import { Usuario } from "../../types/Dominio";
import GenericAvatar from "../AvatarGenerico/AvatarGenerico";

type Props = {
    usuario: Usuario[]
};

export default function UsersSideBar({ usuario }: Props) {
    return (
        <aside className="usuarios-sidebar">
            <h3>Conectados</h3>

            {usuario.map((u) => (
                <div key={u.codigo} className="usuarios-item">
                    <div className="usuarios-avatar">
                        {u.foto ? (
                            <img src={u.foto} alt={u.nome} />
                        ) : (
                            <GenericAvatar />
                        )}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">{u.nome}</span>
                        <span className="text-xs text-gray-500">{u.pais}</span>
                    </div>

                    <span className="usuario-status ml-auto"></span>
                </div>
            ))}
        </aside>
    );
}
