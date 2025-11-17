import { useState } from "react";

type Props = {
    onPostar: (conteudo: string) => void;
};

export default function PostCriar({ onPostar }: Props) {
    const [texto, setTexto] = useState("");

    function enviar() {
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

            <button className="post-criar-btn" onClick={enviar}>
                Publicar
            </button>
        </div>
    );
}
