import { Link } from "react-router-dom";

type CardNeonProps = {
  titulo: string;
  texto: string;
  link: string;
};

export default function CardNeon({ titulo, texto, link }: CardNeonProps) {
  return (
    <Link to={link} className="card-neon-horizontal">
      <div className="card-neon-content">
        <h2 className="card-neon-title">{titulo}</h2>
        <p className="card-neon-texto">{texto}</p>
      </div>
    </Link>
  );
}
