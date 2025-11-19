import { createContext, useContext, useEffect, useState } from "react";

type Usuario = {
    id: number;
    nome: string;
    email: string;
    foto?: string;
    avatar?: string;
    avatarFallback?: string;
    avatarColor?: string;
};

type AuthContextType = {
    usuario: Usuario | null;
    login: (user: Usuario) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    usuario: null,
    login: () => { },
    logout: () => { },
});

function getDefaultAvatar(nome: string) {
    const initials = nome
        .split(" ")
        .filter(Boolean)
        .map((parte) => parte[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return {
        initials,
        color: "#1EC88A",
    };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const salvo = localStorage.getItem("usuario");
        if (salvo) {
            const dados = JSON.parse(salvo);
            const info = getDefaultAvatar(dados.nome ?? "Usuário");
            setUsuario({
                ...dados,
                avatarFallback: dados.avatarFallback ?? info.initials,
                avatarColor: dados.avatarColor ?? info.color,
            });
        }
    }, []);

    function login(user: Usuario) {
        const info = getDefaultAvatar(user.nome);
        const comAvatar = {
            ...user,
            foto: user.foto || "",
            avatar: user.foto || "",
            avatarFallback: info.initials,
            avatarColor: info.color,
        };

        setUsuario(comAvatar);
        localStorage.setItem("usuario", JSON.stringify(comAvatar));
    }

    function logout() {
        setUsuario(null);
        localStorage.removeItem("usuario");
    }

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
