import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

type Props = {
    onPostar: (conteudo: string) => void;
};

export default function PostCriar({ onPostar }: Props) {
    const [texto, setTexto] = useState("");
    const { usuario } = useAuth();

    function enviar() {
        if (!usuario) {
            alert("Você precisa estar logado para postar.");
            return;
        }

        if (texto.trim().length === 0) return;

        onPostar(texto);
        setTexto("");
    }

    return (
        <div className="post-criar">
            <textarea
                className="post-criar-input"
                placeholder="Compartilhe algo com o mundo..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />

            <button
                className="post-criar-btn"
                onClick={enviar}
                disabled={!usuario}
            >
                {usuario ? "Publicar" : "Faça login para postar"}
            </button>
        </div>
    );
}
