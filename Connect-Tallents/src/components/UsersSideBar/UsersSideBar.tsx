export default function UsersSideBar({ usuarios }: any) {
    return (
        <aside className="usuarios-sidebar">
            <h3>Conectados</h3>

            {usuarios.map((u: any) => (
                <div key={u.codigo} className="usuarios-item">
                    <img
                        src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${u.nome}`}
                        className="usuarios-avatar"
                    />

                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">{u.nome}</span>
                        <span className="text-xs text-gray-500">{u.pais}</span>
                    </div>

                    <span className="usuario-status ml-auto"></span>
                </div>
            ))}
        </aside>
    );
}
