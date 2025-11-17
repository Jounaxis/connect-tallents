import BackgroundNeon from "../../components/Background/Background";
import CardIntegrante from "../../components/CardIntegrante/CardIntegrante";
import { membros } from "../../data/integrantes";

export default function Integrantes() {
    return (
        <main className="home-container">

            <BackgroundNeon />

            <h1 className="home-titulo">Nossos Integrantes</h1>

            <div className="integrantes-cards">

                {membros.map((membro) => (
                    <CardIntegrante key={membro.rm} {...membro} />
                ))}

            </div>

        </main>
    );
}
