import { FiTrendingUp, FiGlobe, FiUsers, FiTarget } from "react-icons/fi";

export default function Tendencias() {
    return (
        <aside className="global-tendencias">
            <h3>Tendências</h3>

            <div className="tendencia-item">
                <FiTrendingUp className="tendencia-icon" />
                Colaborações em Alta
            </div>

            <div className="tendencia-item">
                <FiUsers className="tendencia-icon" />
                Projetos Ativos
            </div>

            <div className="tendencia-item">
                <FiGlobe className="tendencia-icon" />
                Conexões Internacionais
            </div>

            <div className="tendencia-item">
                <FiTarget className="tendencia-icon" />
                Habilidades em destaque
            </div>
        </aside>
    );
}
