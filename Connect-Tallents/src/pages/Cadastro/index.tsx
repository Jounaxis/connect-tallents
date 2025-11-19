import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { endpoints } from "../../services/endpoint";
import BackgroundNeon from "../../components/Background/Background";

export default function Cadastro() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nome: "",
        email: "",
        pais: "",
        idioma: "",
        tipoUsuario: "Profissional", 
        habilidade: "",
    });

    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
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
                            <option value="Profissional">Profissional</option>
                            <option value="Mentor">Mentor</option>
                            <option value="Admin">Admin</option>
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
