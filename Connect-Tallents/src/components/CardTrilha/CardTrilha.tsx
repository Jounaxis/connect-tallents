type Props = {
    titulo: string;
    desc: string;
};

export default function CardTrilha({ titulo, desc }: Props) {
    return (
        <div className="trilha-card">
            <h3>{titulo}</h3>
            <p>{desc}</p>
        </div>
    );
}
