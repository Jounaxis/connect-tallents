import { createContext, useContext, useEffect, useState } from "react";

type Usuario = {
    id: number;     
    nome: string;
    email: string;
    foto?: string;
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const salvo = localStorage.getItem("usuario");
        if (salvo) {
            setUsuario(JSON.parse(salvo));
        }
    }, []);

    function login(user: Usuario) {
        setUsuario(user);
        localStorage.setItem("usuario", JSON.stringify(user));
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
