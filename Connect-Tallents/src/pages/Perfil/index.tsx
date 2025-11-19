import { FormEvent, useEffect, useMemo, useState } from "react";
import BackgroundNeon from "../../components/Background/Background";
import { endpoints } from "../../services/endpoint";
import { useAuth } from "../../context/AuthContext";
import { Usuario } from "../../types/Dominio";
import GenericAvatar from "../../components/AvatarGenerico/AvatarGenerico";

type PerfilForm = {
    nome: string;
    email: string;
    pais: string;
    idioma: string;
    tipoUsuario: string;
    habilidade: string;
    foto?: string;
    dataCadastro: string;
};

const formInicial: PerfilForm = {
    nome: "",
    email: "",
    pais: "",
    idioma: "",
    tipoUsuario: "Profissional",
    habilidade: "",
    foto: "",
    dataCadastro: "",
};

export default function Perfil() {
    const { usuario, login } = useAuth();
    const [form, setForm] = useState<PerfilForm>(formInicial);
    const [perfilOriginal, setPerfilOriginal] = useState<PerfilForm>(formInicial);
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        async function carregarPerfil() {
            if (!usuario?.id) {
                setCarregando(false);
                return;
            }

            try {
                setCarregando(true);
                const dados = await endpoints.obterUsuario(usuario.id);
                preencherFormulario(dados);
            } catch (error) {
                console.error("Erro ao carregar perfil:", error);
                setErro("Não foi possível carregar os dados do perfil.");
            } finally {
                setCarregando(false);
            }
        }

        carregarPerfil();
    }, [usuario]);

    function preencherFormulario(dados: Usuario) {
        const preenchido: PerfilForm = {
            nome: dados.nome ?? "",
            email: dados.email ?? "",
            pais: dados.pais ?? "",
            idioma: dados.idioma ?? "",
            tipoUsuario: dados.tipoUsuario ?? "Profissional",
            habilidade: dados.habilidade ?? "",
            foto: dados.foto ?? "",
            dataCadastro: dados.dataCadastro ?? new Date().toISOString(),
        };
        setForm(preenchido);
        setPerfilOriginal(preenchido);
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleFotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setForm((prev) => ({ ...prev, foto: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!usuario?.id) return;

        setErro("");
        setMensagem("");
        try {
            setSalvando(true);
            const payload: Partial<Usuario> & { id?: number } = {
                ...form,
                codigo: usuario.id,
                dataCadastro: form.dataCadastro || new Date().toISOString(),
            };
            payload.id = usuario.id;
            const atualizado = await endpoints.atualizarUsuario(usuario.id, payload) ?? { ...form };
            preencherFormulario(atualizado as Usuario);
            setMensagem("Perfil atualizado com sucesso!");
            login({
                ...usuario,
                nome: atualizado.nome ?? usuario.nome,
                email: atualizado.email ?? usuario.email,
                foto: atualizado.foto ?? usuario.foto,
            });
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            setErro("Falha ao salvar alterações. Tente novamente.");
        } finally {
            setSalvando(false);
        }
    }

    const avatarPreview = useMemo(() => {
        if (form.foto?.trim()) return form.foto.trim();
        if (usuario?.foto) return usuario.foto;
        return "";
    }, [form.foto, usuario]);

    if (!usuario) {
        return (
            <main className="perfil-container">
                <BackgroundNeon />
                <div className="perfil-card">
                    <h1 className="perfil-title">Meu Perfil</h1>
                    <p className="form-error">Faça login para acessar esta página.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="perfil-container">
            <BackgroundNeon />
            <section className="perfil-card">
                <header className="perfil-header">
                    <div>
                        <p className="perfil-title">Meu Perfil</p>
                        <div className="perfil-tabs">
                            <span className="ativo">Dados do Usuário</span>
                        </div>
                    </div>
                </header>

                {carregando ? (
                    <p className="perfil-loading">Carregando perfil...</p>
                ) : (
                    <form className="perfil-form" onSubmit={handleSubmit}>
                        <div className="perfil-content">
                            <div className="perfil-avatar-card">
                                <div className="perfil-avatar-wrapper">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt={form.nome || usuario.nome} />
                                    ) : (
                                        <GenericAvatar />
                                    )}
                                </div>
                                <h3>{form.nome || usuario.nome}</h3>
                                <p>{form.email || usuario.email}</p>

                                <label className="perfil-label">Upload de foto</label>
                                <label className="perfil-upload">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFotoUpload}
                                    />
                                    <span>Selecionar arquivo</span>
                                </label>
                            </div>

                            <div className="perfil-fields">
                                <div className="perfil-grid">
                                    <div>
                                        <label className="perfil-label">Nome completo</label>
                                        <input
                                            className="form-input"
                                            name="nome"
                                            value={form.nome}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="perfil-label">Email</label>
                                        <input
                                            className="form-input"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="perfil-label">País</label>
                                        <input
                                            className="form-input"
                                            name="pais"
                                            value={form.pais}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="perfil-label">Idioma</label>
                                        <input
                                            className="form-input"
                                            name="idioma"
                                            value={form.idioma}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="perfil-label">Tipo de Usuário</label>
                                        <select
                                            className="form-input"
                                            name="tipoUsuario"
                                            value={form.tipoUsuario}
                                            onChange={handleChange}
                                        >
                                            <option value="Profissional">Profissional</option>
                                            <option value="Mentor">Mentor</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="perfil-label">Habilidade</label>
                                        <input
                                            className="form-input"
                                            name="habilidade"
                                            value={form.habilidade}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {erro && <p className="form-error">{erro}</p>}
                                {mensagem && <p className="form-success">{mensagem}</p>}

                                <div className="perfil-actions">
                                    <button
                                        type="button"
                                        className="perfil-secondary-btn"
                                        onClick={() => setForm(perfilOriginal)}
                                    >
                                        Descartar
                                    </button>
                                    <button className="form-button" type="submit" disabled={salvando}>
                                        {salvando ? "Salvando..." : "Salvar alterações"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </section>
        </main>
    );
}
