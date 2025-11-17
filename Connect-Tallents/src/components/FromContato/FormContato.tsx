import { useState } from "react";

export type FormContatoProps = {
    titulo?: string;
    descricao?: string;
};

export default function FormContato({
    titulo = "Entre em Contato",
    descricao = "Envie seu feedback, sugestão ou dúvida. Retornaremos assim que possível!",
}: FormContatoProps) {

    const [form, setForm] = useState({
        nome: "",
        email: "",
        mensagem: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Feedback enviado:", form);

        alert("Feedback enviado com sucesso!");

        setForm({ nome: "", email: "", mensagem: "" });
    };

    return (
        <form className="contato-form" onSubmit={handleSubmit}>
            <h2 className="contato-form-titulo">{titulo}</h2>
            <p className="contato-form-descricao">{descricao}</p>

            {/* Nome */}
            <div className="contato-input-container">
                <label>Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    className="contato-input"
                    placeholder="Digite seu nome"
                    required
                />
            </div>

            {/* Email */}
            <div className="contato-input-container">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="contato-input"
                    placeholder="Digite seu email"
                    required
                />
            </div>

            {/* Mensagem */}
            <div className="contato-input-container">
                <label>Mensagem</label>
                <textarea
                    name="mensagem"
                    value={form.mensagem}
                    onChange={handleChange}
                    className="contato-textarea"
                    placeholder="Digite sua mensagem"
                    required
                ></textarea>
            </div>

            {/* Botão */}
            <button type="submit" className="contato-botao">
                Enviar Feedback
            </button>
        </form>
    );
}
