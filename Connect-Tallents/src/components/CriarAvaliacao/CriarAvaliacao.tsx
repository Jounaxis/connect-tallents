import { useEffect, useState } from "react";
import { endpoints } from "../../services/endpoint";
import { Projeto, Colaboracao } from "../../types/Dominio";
import { useAuth } from "../../context/AuthContext";

type Props = {
    onAvaliar: (dados: {
        nota: number;
        comentario: string;
        idProjeto: number;
    }) => void | Promise<void>;
};

export default function CriarAvaliacao({ onAvaliar }: Props) {
    const { usuario } = useAuth();

    const [nota, setNota] = useState(8);
    const [comentario, setComentario] = useState("");
    const [idProjeto, setIdProjeto] = useState<number>(0);

    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [carregando, setCarregando] = useState(true);

    // ===============================
    // Carregar projetos que o usuário participa
    // ===============================
    useEffect(() => {
        async function carregar() {
            try {
                setCarregando(true);

                const [todosProjetos, colabs] = await Promise.all([
                    endpoints.listarProjetos(),
                    endpoints.listarColaboracoes(),
                ]);

                const colabsDoUsuario = colabs.filter(
                    (c: Colaboracao) => c.idUsuario === usuario?.id
                );

                const projetosPermitidos = todosProjetos.filter((p: Projeto) =>
                    colabsDoUsuario.some((c) => c.idProjeto === p.codigo)
                );

                setProjetos(projetosPermitidos);

                if (projetosPermitidos.length > 0) {
                    setIdProjeto(projetosPermitidos[0].codigo);
                }

            } catch (e) {
                console.error("Erro ao carregar projetos:", e);
            } finally {
                setCarregando(false);
            }
        }

        carregar();
    }, [usuario]);

    async function enviar() {
        if (!comentario.trim()) return;

        await onAvaliar({
            nota,
            comentario,
            idProjeto,
        });

        setComentario("");
    }

    return (
        <div className="post-criar experiencia-criar shadow-lg rounded-2xl border border-[var(--verde-metalico-translucido)] p-6">

            {/* Título */}
            <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--branco-principal)] drop-shadow">
                    Compartilhe sua experiência
                </h2>
                <p className="text-sm text-[var(--texto-medio)] mt-1">
                    Avalie um projeto que você participou e ajude outros profissionais.
                </p>
            </div>

            {/* Campos */}
            <div className="space-y-4">

                {/* SELECT DE PROJETOS */}
                <div>
                    <label className="exp-label">Projeto</label>

                    {carregando ? (
                        <div className="exp-loading">Carregando...</div>
                    ) : (
                        <select
                            className="exp-select w-full"
                            value={idProjeto}
                            onChange={(e) => setIdProjeto(Number(e.target.value))}
                        >
                            {projetos.map((p) => (
                                <option key={p.codigo} value={p.codigo}>
                                    {p.conteudo || `Projeto ${p.codigo}`}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* SLIDER */}
                <div>
                    <label className="exp-label">Nota (0 a 10)</label>

                    <div className="exp-slider-container">
                        <input
                            className="exp-slider"
                            type="range"
                            min={0}
                            max={10}
                            step={0.1}
                            value={nota}
                            onChange={(e) => setNota(Number(e.target.value))}
                        />
                        <span className="exp-slider-valor">{nota.toFixed(1)}</span>
                    </div>
                </div>
            </div>

            {/* Comentário */}
            <textarea
                className="post-criar-input mt-4"
                placeholder="Conte como foi sua experiência colaborando nesse projeto..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
            />

            {/* BOTÃO */}
            <button className="post-criar-btn mt-4" onClick={enviar}>
                Enviar avaliação
            </button>
        </div>
    );
}