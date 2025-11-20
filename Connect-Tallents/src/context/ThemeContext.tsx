import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type Tema = "light" | "dark";

type TemaContexto = {
    tema: Tema;
    alternarTema: () => void;
};

const ThemeContext = createContext<TemaContexto | undefined>(undefined);
const STORAGE_KEY = "theme";

function detectarTemaSistema(): Tema {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const saved = localStorage.getItem(STORAGE_KEY);
    const preferenciaSalva = saved === "dark" || saved === "light" ? saved as Tema : null;

    const [tema, setTema] = useState<Tema>(() => preferenciaSalva ?? detectarTemaSistema());
    const [temPreferenciaManual, setPreferenciaManual] = useState<boolean>(!!preferenciaSalva);

    useEffect(() => {
        const root = document.documentElement;
        if (tema === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem(STORAGE_KEY, tema);
    }, [tema]);

    useEffect(() => {
        if (temPreferenciaManual) return;

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (event: MediaQueryListEvent) => {
            setTema(event.matches ? "dark" : "light");
        };

        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, [temPreferenciaManual]);

    const alternarTema = () => {
        setPreferenciaManual(true);
        setTema((current) => (current === "dark" ? "light" : "dark"));
    };

    const value = useMemo(() => ({ tema, alternarTema }), [tema]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme deve ser usado dentro de ThemeProvider");
    }
    return context;
}
