import { FiTrendingUp, FiGlobe, FiUsers, FiTarget } from "react-icons/fi";
import { Link } from "react-router-dom";
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
                <Link to="/colaboracao">Projetos Ativos</Link>
            </div>

            <div className="tendencia-item">
                <FiGlobe className="tendencia-icon" />
                <Link to="/global">Conexões Internacionais</Link>
            </div>

            <div className="tendencia-item">
                <FiTarget className="tendencia-icon" />
                Habilidades em destaque
            </div>
        </aside>
    );
}
