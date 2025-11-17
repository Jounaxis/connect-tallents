import { Link } from "react-router-dom";
import TrocarTema from "../Tema/Tema";

export default function Cabecalho() {
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
                </nav>


                <div className="cabecalho_acoes">
                
                <TrocarTema />

                    <Link to="/login" className="cabecalho_botao_login">
                        Login
                    </Link>
                </div>

            </div>
        </header>
    );
}
