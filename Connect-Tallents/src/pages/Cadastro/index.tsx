import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { endpoints } from "../../services/endpoint";
import BackgroundNeon from "../../components/Background/Background";
import { TIPOS_USUARIO, TipoUsuario } from "../../types/Dominio";

type CadastroForm = {
    nome: string;
    email: string;
    pais: string;
    idioma: string;
    tipoUsuario: TipoUsuario;
    habilidade: string;
};

export default function Cadastro() {
    const navigate = useNavigate();
    const [form, setForm] = useState<CadastroForm>({
        nome: "",
        email: "",
        pais: "",
        idioma: "",
        tipoUsuario: TIPOS_USUARIO[0],
        habilidade: "",
    });

    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        const field = name as keyof CadastroForm;
        if (field === "tipoUsuario") {
            setForm((prev) => ({ ...prev, tipoUsuario: value as TipoUsuario }));
            return;
        }
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErro("");

        try {
            setCarregando(true);

            await endpoints.criarUsuario({
                ...form,
                dataCadastro: new Date().toISOString()
            });

            navigate("/login");

        } catch (err) {
            console.error("ERRO REAL DO CADASTRO:", err);
            setErro("Erro ao cadastrar. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="cadastro-container">
            <BackgroundNeon />

            <div className="cadastro-card">
                <h1 className="form-title">Cadastro</h1>

                <form className="form-content" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Nome</label>
                        <input
                            className="form-input"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">País</label>
                        <input
                            className="form-input"
                            name="pais"
                            value={form.pais}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Idioma</label>
                        <input
                            className="form-input"
                            name="idioma"
                            value={form.idioma}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Tipo de Usuário</label>
                        <select
                            className="form-input"
                            name="tipoUsuario"
                            value={form.tipoUsuario}
                            onChange={handleChange}
                        >
                            {TIPOS_USUARIO.map((tipo) => (
                                <option key={tipo} value={tipo}>
                                    {tipo}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Habilidade</label>
                        <input
                            className="form-input"
                            name="habilidade"
                            value={form.habilidade}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {erro && <p className="form-error">{erro}</p>}

                    <button className="form-button" type="submit" disabled={carregando}>
                        {carregando ? "Cadastrando..." : "Cadastrar"}
                    </button>

                    <p className="form-footer">
                        Já tem conta? <Link to="/login">Entrar</Link>
                    </p>
                </form>
            </div>
        </main>
    );
}
