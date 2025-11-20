import { Link } from "react-router-dom";

export default function Rodape() {
  return (
    <footer className="rodape-minimalista">

      <nav className="rodape_links">
        <Link to="/integrantes" className="rodape_link">Integrantes</Link>
        <Link to="/sobre" className="rodape_link">Sobre</Link>
        <Link to="/contato" className="rodape_link">Contato</Link>
        <Link to="/faq" className="rodape_link">FAQ</Link>
      </nav>

      <div className="rodape_copy">
        © 2025 Connect Tallents. Todos os direitos reservados.
      </div>

    </footer>
  );
}
