import { useEffect, useState } from "react";
import { endpoints } from "../../services/endpoint";

import BackgroundNeon from "../../components/Background/Background";
import PostCriar from "../../components/PostCriar/PostCriar";
import PostItem from "../../components/PostItem/PostItem";
import UsersSideBar from "../../components/UsersSideBar/UsersSideBar";
import PostCarregamento from "../../components/Carregamento/Carregamento";
import Tendencias from "../../components/Tendencias/Tendencias";

export default function Global() {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);

    // === CRIAR POST ===
    async function criarPost(conteudo: string) {
        const novo = await endpoints.criarMensagem({
            conteudo,
            codigoUsuario: 1, // * alterar depois para usuário logado
            dataEnvio: new Date().toISOString()
        });

        setPosts([novo, ...posts]);
    }

    // === CARREGAR TUDO ===
    useEffect(() => {
        async function carregarTudo() {
            try {
                setCarregando(true);

                const mensagensData = await endpoints.listarMensagens();
                const usuariosData = await endpoints.listarUsuarios();

                setUsuarios(usuariosData);

                const mapaUsuarios: Record<number, any> = {};
                usuariosData.forEach((u: any) => {
                    mapaUsuarios[u.codigo] = u;
                });

                const mensagensComNomes = mensagensData.map((msg: any) => ({
                    ...msg,
                    usuario: mapaUsuarios[msg.idUsuario] || null
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

                <UsersSideBar usuarios={usuarios} />

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
                            <PostItem key={p.codigo} post={p} />
                        ))
                    )}
                </div>

                <Tendencias />

            </div>
        </main>
    );
}
