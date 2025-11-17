import { Link } from "react-router-dom";

export default function Rodape() {
  return (
    <footer className="rodape-minimalista">

      <nav className="rodape_links">
        <Link to="/integrantes" className="cabecalho_link">Integrantes</Link>
        <Link to="/sobre" className="cabecalho_link">Sobre</Link>
        <Link to="/contato" className="cabecalho_link">Contato</Link>
      </nav>

      <div className="rodape_copy">
        © 2025 Connect Tallents. Todos os direitos reservados.
      </div>

    </footer>
  );
}
