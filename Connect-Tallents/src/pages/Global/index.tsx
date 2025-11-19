import { useEffect, useState } from "react";
import { endpoints } from "../../services/endpoint";
import { Usuario, MensagemComUsuario } from "../../types/Dominio";

import BackgroundNeon from "../../components/Background/Background";
import PostCriar from "../../components/PostCriar/PostCriar";
import PostItem from "../../components/PostItem/PostItem";
import UsersSideBar from "../../components/UsersSideBar/UsersSideBar";
import PostCarregamento from "../../components/Carregamento/Carregamento";
import Tendencias from "../../components/Tendencias/Tendencias";

import { useAuth } from "../../context/AuthContext";

export default function Global() {

    const { usuario } = useAuth(); 
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [posts, setPosts] = useState<MensagemComUsuario[]>([]);
    const [carregando, setCarregando] = useState(true);

    async function criarPost(conteudo: string) {
        if (!usuario) {
            alert("Você precisa estar logado para postar.");
            return;
        }

        try {
            const novo = await endpoints.criarMensagem({
                conteudo,
                dataEnvio: new Date().toISOString(),
                idUsuario: usuario.id,   
                idProjeto: 9            
            });
            const postComUsuario: MensagemComUsuario = {
                ...novo,
                usuario: {
                    codigo: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    foto: usuario.foto ?? ""
                }
            };



            setPosts((prev) => [postComUsuario, ...prev]);

        } catch (err) {
            console.error("ERRO AO CRIAR POST:", err);
        }
    }

    useEffect(() => {
        async function carregarTudo() {
            try {
                setCarregando(true);

                const mensagensData = await endpoints.listarMensagens();
                const usuariosData = await endpoints.listarUsuarios();

                setUsuarios(usuariosData);

                const mapaUsuarios: Record<number, Usuario> = {};
                usuariosData.forEach((u) => {
                    mapaUsuarios[u.codigo] = u;
                });

                const mensagensComNomes = mensagensData.map((msg) => ({
                    ...msg,
                    usuario: mapaUsuarios[msg.idUsuario] || null,
                }));

                setPosts(mensagensComNomes);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setCarregando(false);
            }
        }

        carregarTudo();
    }, []);

    return (
        <main className="global-container">
            <BackgroundNeon />

            <h1 className="global-titulo">Connect Tallents Global</h1>

            <div className="global-layout">

                <UsersSideBar usuario={usuarios} />

                <div className="global-feed">
                    <PostCriar onPostar={criarPost} />

                    {carregando ? (
                        <>
                            <PostCarregamento />
                            <PostCarregamento />
                            <PostCarregamento />
                        </>
                    ) : (
                        posts.map((p) => (
                            <PostItem
                                key={p.codigo}
                                post={p}
                                podeExcluir={usuario?.id === p.idUsuario}
                                onExcluir={async (id) => {
                                    try {
                                        await endpoints.deletarMensagem(id);
                                        setPosts((prev) => prev.filter((post) => post.codigo !== id));
                                    } catch (error) {
                                        console.error("Erro ao deletar post:", error);
                                        alert("Não foi possível excluir o post.");
                                    }
                                }}
                            />
                        ))
                    )}
                </div>

                <Tendencias />

            </div>
        </main>
    );
}
