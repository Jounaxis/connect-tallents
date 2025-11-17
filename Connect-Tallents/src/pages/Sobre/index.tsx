import BackgroundNeon from "../../components/Background/Background";
import { sobreSecoes } from "../../data/SobreSecoes";

export default function Sobre() {
    return (
        <main className="sobre-dinamico-container">

            <BackgroundNeon />

            <h1 className="sobre-dinamico-titulo">Sobre o Projeto</h1>

            {sobreSecoes.map((secao, index) => (
                <section
                    key={index}
                    className={`sobre-dinamico-secao ${index % 2 === 1 ? "invertida" : ""
                        }`}
                >
                    <div className="sobre-dinamico-texto">
                        <h2>{secao.titulo}</h2>
                        <p>{secao.texto}</p>
                    </div>

                    <img
                        src={secao.imagem}
                        alt={secao.titulo}
                        className="sobre-dinamico-imagem"
                    />
                </section>
            ))}

        </main>
    );
}
