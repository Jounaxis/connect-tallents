import { Link } from "react-router-dom";
import TrocarTema from "../Tema/Tema";
import { useAuth } from "../../context/AuthContext";
import DropdownUsuario from "../DropdownUsuario/DropdownUsuario";

export default function Cabecalho() {
  const { usuario } = useAuth();

  return (
    <header className="cabecalho">
      <div className="cabecalho_container">
        <div className="cabecalho_logo">
          <Link to="/">
            <h1 className="cabecalho_titulo">Connect Tallents</h1>
          </Link>
        </div>

        <nav className="cabecalho_nav">
          <Link to="/" className="cabecalho_link">Home</Link>
          <Link to="/global" className="cabecalho_link">Global</Link>
          <Link to="/colaboracao" className="cabecalho_link">Colaboracao</Link>
          <Link to="/experiencia" className="cabecalho_link">Experiencia</Link>
          <Link to="/preparacao" className="cabecalho_link">Preparacao</Link>
        </nav>

        <div className="cabecalho_acoes">
          <TrocarTema />

          {!usuario ? (
            <Link to="/login" className="cabecalho_botao_login">
              Login
            </Link>
          ) : (
            <DropdownUsuario />
          )}
        </div>
      </div>
    </header>
  );
}
