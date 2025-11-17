import { Link } from "react-router-dom";

type CardNeonProps = {
  titulo: string;
  texto: string;
  link: string;
  icon: React.ReactNode;
};

export default function CardNeon({ titulo, texto, link, icon }: CardNeonProps) {
  return (
    <Link to={link} className="card-neon-horizontal">
      <div className="card-neon-content">

        {/* ÍCONE CIRCULAR */}
        <div className="card-neon-icone">
          {icon}
        </div>

        <h2 className="card-neon-title">{titulo}</h2>
        <p className="card-neon-texto">{texto}</p>

        <div className="card-neon-linha" />
      </div>
    </Link>
  );
}
