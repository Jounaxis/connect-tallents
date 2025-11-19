import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { endpoints } from "../../services/endpoint";
import { useAuth } from "../../context/AuthContext";
import BackgroundNeon from "../../components/Background/Background";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const { login } = useAuth();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErro("");

        try {
            setCarregando(true);

            const usuarios = await endpoints.listarUsuarios();
            const user = usuarios.find((u) => u.email === email);

            if (!user) {
                setErro("Usuário não encontrado");
                return;
            }

            login({
                id: user.codigo,
                nome: user.nome,
                email: user.email,
                foto: user.foto,
            });

            navigate("/");
        } catch (err) {
            setErro("Erro ao entrar. Tente novamente.");
            console.error(err);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="login-container">
            <BackgroundNeon />

            <div className="login-card">
                <h1 className="form-title">Login</h1>

                <form className="form-content" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            className="form-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {erro && <p className="form-error">{erro}</p>}

                    <button className="form-button" type="submit" disabled={carregando}>
                        {carregando ? "Entrando..." : "Entrar"}
                    </button>

                    <p className="form-footer">
                        Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
                    </p>
                </form>
            </div>
        </main>
    );
}
