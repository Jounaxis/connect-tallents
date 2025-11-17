import BackgroundNeon from "../../components/Background/Background";
import FormContato from "../../components/FromContato/FormContato";

export default function Contato() {
    return (
        <main className="home-container">

            <BackgroundNeon />

            <h1 className="home-titulo">Fale Conosco</h1>

            <p className="home-descricao max-w-2xl">
                Sua opinião é muito importante para nós!
                Envie sugestões, dúvidas ou feedbacks sobre a plataforma.
            </p>

            <FormContato />

        </main>
    );
}
