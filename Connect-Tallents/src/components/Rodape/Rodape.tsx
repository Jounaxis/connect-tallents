import { Link } from "react-router-dom";

export default function Rodape() {
  return (
    <footer className="rodape-minimalista">

      <nav className="rodape_links">
        <Link to="/" className="rodape_link">Home</Link>
      </nav>

      <div className="rodape_copy">
        © 2025 Connect Tallents. Todos os direitos reservados.
      </div>

    </footer>
  );
}
