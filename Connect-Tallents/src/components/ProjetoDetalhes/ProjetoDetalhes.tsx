import { StatusTarefa, STATUS_TAREFA } from "../../types/Dominio";

type DetalheForm = {
    nome: string;
    descricaoTarefa: string;
    area: string;
    status: StatusTarefa;
    dataCriacao: string;
    dataConclusao?: string | null;
};

type Props = {
    value: DetalheForm;
    onChange: (campo: keyof DetalheForm, valor: string) => void;
    onSave: () => void;
    onCancel: () => void;
    saving?: boolean;
    error?: string;
};

export default function ProjetoDetalhes({
    value,
    onChange,
    onSave,
    onCancel,
    saving = false,
    error,
}: Props) {
    return (
        <div className="projeto-card criar-projeto-card">
            <div className="projeto-header">
                <h2 className="projeto-nome">Adicionar detalhes</h2>
                <p className="projeto-info">
                    Informe nome, status, área e descrição da tarefa para este projeto.
                </p>
            </div>

            <div className="projeto-fields grid gap-3">
                <div className="flex flex-col gap-1">
                    <label className="perfil-label">Nome</label>
                    <input
                        className="form-input"
                        value={value.nome}
                        onChange={(e) => onChange("nome", e.target.value)}
                        disabled={saving}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="perfil-label">Área</label>
                    <input
                        className="form-input"
                        value={value.area}
                        onChange={(e) => onChange("area", e.target.value)}
                        disabled={saving}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="perfil-label">Status</label>
                    <select
                        className="form-input"
                        value={value.status}
                        onChange={(e) => onChange("status", e.target.value)}
                        disabled={saving}
                    >
                        {STATUS_TAREFA.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="perfil-label">Data de criação</label>
                    <input
                        type="date"
                        className="form-input"
                        value={value.dataCriacao}
                        onChange={(e) => onChange("dataCriacao", e.target.value)}
                        disabled={saving}
                        max={new Date().toISOString().split("T")[0]}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="perfil-label">Data de conclusão (opcional)</label>
                    <input
                        type="date"
                        className="form-input"
                        value={value.dataConclusao || ""}
                        onChange={(e) => onChange("dataConclusao", e.target.value)}
                        disabled={saving}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="perfil-label">Descrição</label>
                    <textarea
                        className="form-input min-h-[120px]"
                        value={value.descricaoTarefa}
                        onChange={(e) => onChange("descricaoTarefa", e.target.value)}
                        disabled={saving}
                        placeholder="Explique a tarefa, objetivos e necessidades..."
                    />
                </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="projeto-actions flex gap-2 mt-2">
                <button
                    type="button"
                    className="btn-detalhes"
                    onClick={onSave}
                    disabled={
                        saving ||
                        value.nome.trim().length === 0 ||
                        value.descricaoTarefa.trim().length === 0
                    }
                >
                    {saving ? "Salvando..." : "Salvar"}
                </button>
                <button
                    type="button"
                    className="btn-detalhes danger"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
