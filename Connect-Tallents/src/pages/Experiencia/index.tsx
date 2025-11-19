import { useEffect, useState } from "react";
import { endpoints } from "../../services/endpoint";
import { Usuario, Avaliacao } from "../../types/Dominio";

import BackgroundNeon from "../../components/Background/Background";
import UsersSideBar from "../../components/UsersSideBar/UsersSideBar";
import Tendencias from "../../components/Tendencias/Tendencias";
import PostCarregamento from "../../components/Carregamento/Carregamento";

import CriarAvaliacao from "../../components/CriarAvaliacao/CriarAvaliacao";
import CardAvaliacao from "../../components/CardAvaliacao/CardAvaliacao";
import { useAuth } from "../../context/AuthContext";

type AvaliacaoComUsuario = Avaliacao & {
    usuario?: Usuario | null;
};

export default function Experiencia() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [avaliacoes, setAvaliacoes] = useState<AvaliacaoComUsuario[]>([]);
    const [carregando, setCarregando] = useState(true);
    const { usuario } = useAuth();

    async function carregarTudo() {
        try {
            setCarregando(true);

            const [usuariosData, avaliacoesData] = await Promise.all([
                endpoints.listarUsuarios(),
                endpoints.listarAvaliacoes(),
            ]);

            setUsuarios(usuariosData);

            const mapaUsuarios: Record<number, Usuario> = {};
            usuariosData.forEach((u) => (mapaUsuarios[u.codigo] = u));

            const avaliacoesCompletas: AvaliacaoComUsuario[] = avaliacoesData.map((a) => {
                const idUsuario =
                    (a as any).idUsuario ?? (a as any).cdUsuario ?? null;

                return {
                    ...a,
                    usuario: idUsuario ? mapaUsuarios[idUsuario] ?? null : null,
                };
            });

            setAvaliacoes(avaliacoesCompletas.reverse());

        } catch (e) {
            console.error("Erro ao carregar avaliações:", e);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarTudo();
    }, []);

    async function criarAvaliacao(dados: {
        nota: number;
        comentario: string;
        idProjeto: number;
    }) {
        if (!usuario) {
            alert("Você precisa estar logado para avaliar.");
            return;
        }

        try {
            const idUsuario = (usuario as any).id ?? (usuario as any).codigo;

            const nova = await endpoints.criarAvaliacao({
                nota: Number(dados.nota),
                comentario: dados.comentario,
                dataAvaliacao: new Date().toISOString(),
                idUsuario,
                idProjeto: Number(dados.idProjeto),
            });

            const usuarioCompleto =
                usuarios.find((u) => u.codigo === idUsuario) ?? null;

            const novaComUsuario: AvaliacaoComUsuario = {
                ...nova,
                usuario: usuarioCompleto,
            };

            setAvaliacoes((prev) => [novaComUsuario, ...prev]);

        } catch (e) {
            console.error("Erro ao criar avaliação:", e);
            alert("Erro ao enviar avaliação. Tente novamente.");
        }
    }

    return (
        <main className="global-container">
            <BackgroundNeon />

            <h1 className="global-titulo">Experiências & Avaliações</h1>

            <div className="global-layout">

                <UsersSideBar usuario={usuarios} />

                <div className="global-feed experiencia-feed">
                    <CriarAvaliacao onAvaliar={criarAvaliacao} />

                    {carregando ? (
                        <>
                            <PostCarregamento />
                            <PostCarregamento />
                            <PostCarregamento />
                        </>
                    ) : (
                        avaliacoes.map((a, index) => (
                            <CardAvaliacao
                                key={
                                    (a as any).codigo ??
                                    `${a.idProjeto}-${a.dataAvaliacao}-${index}`
                                }
                                avaliacao={a}
                            />
                        ))
                    )}
                </div>

                <Tendencias />

            </div>
        </main>
    );
}
