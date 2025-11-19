import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import GenericAvatar from "../AvatarGenerico/AvatarGenerico";

type Coords = {
    top: number;
    right: number;
};

export default function DropdownUsuario() {
    const { usuario, logout } = useAuth();
    const [aberto, setAberto] = useState(false);
    const [coords, setCoords] = useState<Coords | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const avatarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setAberto(false);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    useEffect(() => {
        if (aberto && avatarRef.current) {
            const rect = avatarRef.current.getBoundingClientRect();

            setCoords({
                top: rect.bottom + 12,
                right: window.innerWidth - rect.right, 
            });
        }
    }, [aberto]);

    if (!usuario) return null;

    return (
        <div ref={wrapperRef} className="relative">

            <div
                ref={avatarRef}
                className="cabecalho_user_avatar"
                onClick={() => setAberto((prev) => !prev)}
            >
                {usuario.foto ? (
                    <img src={usuario.foto} alt={usuario.nome} />
                ) : (
                    <GenericAvatar />
                )}
            </div>

            {aberto && coords && (
                <div
                    className="dropdown-menu fixed"
                    style={{
                        top: coords.top,
                        right: coords.right,
                    }}
                >
                    <div className="dropdown-user">
                        {usuario.nome}
                        <br />
                        <span className="text-xs opacity-70">{usuario.email}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Link to="/perfil" className="dropdown-item">
                            Meu Perfil
                        </Link>

                        <span
                            className="dropdown-item dropdown-sair"
                            onClick={logout}
                        >
                            Sair
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
