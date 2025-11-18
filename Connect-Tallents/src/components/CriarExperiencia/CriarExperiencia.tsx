// src/components/ExperienciaCriar/ExperienciaCriar.tsx
import { useState } from "react";

type Props = {
    onPostar: (texto: string) => void;
};

export default function CriarExperiencia({ onPostar }: Props) {
    const [texto, setTexto] = useState("");

    function enviar() {
        if (!texto.trim()) return;
        onPostar(texto);
        setTexto("");
    }

    return (
        <div className="post-criar">
            <h3 className="font-semibold mb-2">Compartilhe sua experiência</h3>

            <textarea
                className="post-criar-input"
                placeholder="Conte algo que aprendeu, viveu ou realizou…"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />

            <button className="post-criar-btn" onClick={enviar}>
                Publicar
            </button>
        </div>
    );
}
