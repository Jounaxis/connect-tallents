type Props = {
    value: string;
    onChange: (valor: string) => void;
    onSubmit: () => void;
    loading?: boolean;
    disabled?: boolean;
    error?: string;
};

export default function CriarProjeto({
    value,
    onChange,
    onSubmit,
    loading = false,
    disabled = false,
    error,
}: Props) {
    return (
        <div className="projeto-card criar-projeto-card">
            <div className="projeto-header">
                <h2 className="projeto-nome">Crie um novo projeto</h2>
                <p className="projeto-info">
                    Lance uma ideia e convide outros membros para colaborar em algo novo.
                </p>
            </div>

            <input
                className="form-input"
                placeholder="Nome ou pitch do projeto"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled || loading}
            />

            {error && <p className="form-error">{error}</p>}

            <div className="projeto-actions">
                <button
                    type="button"
                    className="form-button"
                    onClick={onSubmit}
                    disabled={disabled || loading || value.trim().length === 0}
                >
                    {loading ? "Publicando..." : "Criar projeto"}
                </button>
                {disabled && (
                    <span className="text-xs text-gray-500">
                        Faca login para abrir um novo projeto.
                    </span>
                )}
            </div>
        </div>
    );
}
