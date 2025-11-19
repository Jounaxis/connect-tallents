export type StatusTarefa = "Iniciada" | "Em andamento" | "Encerrada" | "Ativa";

export type MensagemComUsuario = Mensagem & {
    usuario?: Partial<Usuario> | null;
};

export interface Usuario {
    codigo: number;
    nome: string;
    email: string;
    pais: string;
    idioma: string;
    tipoUsuario: string;
    habilidade: string;
    dataCadastro: string;
    foto?: string;
    avatar?: string;
}

export type Mensagem = {
    codigo: number;
    conteudo: string;
    dataEnvio: string;
    idUsuario: number;
    idProjeto: number;
};

export interface Avaliacao {
    codigo?: number;
    nota: number;
    comentario: string;
    dataAvaliacao: string;
    idUsuario?: number;
    idProjeto?: number;
}

export interface Projeto {
    codigo: number;
    conteudo: string;
    codigoUsuario: number;
    usuario?: Usuario | null;
}

export interface Tarefa {
    codigo: number;
    nome: string;
    descricaoTarefa: string;
    status: StatusTarefa | string;
    area: string;
    dataCriacao: string;
    codigoProjeto?: number;
}

export type Colaboracao = {
    codigo: number;
    dataEntrada: string;
    funcao: string;
    idUsuario: number;
    idProjeto: number;
};
