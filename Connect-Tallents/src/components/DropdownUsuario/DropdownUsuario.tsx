import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

type Coords = {
    top: number;
    right: number;
};

export default function DropdownUsuario() {
    const { usuario, logout } = useAuth();
    const [aberto, setAberto] = useState(false);
    const [coords, setCoords] = useState<Coords | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const avatarRef = useRef<HTMLImageElement | null>(null);

    // Fecha ao clicar fora
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

    // Calcula posição do dropdown quando abrir
    useEffect(() => {
        if (aberto && avatarRef.current) {
            const rect = avatarRef.current.getBoundingClientRect();

            setCoords({
                top: rect.bottom + 12, // 12px abaixo do avatar
                right: window.innerWidth - rect.right, // encosta no lado direito do avatar
            });
        }
    }, [aberto]);

    if (!usuario) return null;

    return (
        <div ref={wrapperRef} className="relative">
            {/* AVATAR */}
            <img
                ref={avatarRef}
                src={usuario.avatar}
                alt="Avatar"
                className="cabecalho_user_avatar"
                onClick={() => setAberto((prev) => !prev)}
            />

            {/* DROPDOWN */}
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
