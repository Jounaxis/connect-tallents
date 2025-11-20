import { Tarefa } from "../../types/Dominio";

type Props = {
    tarefa: Tarefa;
};

export default function CardTarefa({ tarefa }: Props) {
    return (
        <div className="tarefa-card">

            <div className="tarefa-header">
                <h3>{tarefa.nome}</h3>
                <span className={`status ${tarefa.status.toLowerCase().replace(" ", "-")}`}>
                    {tarefa.status}
                </span>
            </div>

            <p className="tarefa-desc">{tarefa.descricaoTarefa}</p>

            <div className="tarefa-info">
                <span>📌 Área: {tarefa.area}</span>
                <span>📅 Criada: {new Date(tarefa.dataCriacao).toLocaleDateString()}</span>
            </div>

        </div>
    );
}
