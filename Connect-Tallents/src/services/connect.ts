export type Usuario = {
    codigo: number;
    nome: string;
    email: string;
    pais: string;
    idioma: string;
    tipoUsuario: string;
    habilidade: string;
    dataCadastro: string; 
};

export type Colaboracao = {
    codigo: number;
    dataEntrada: string;
    funcao: string;
    idUsuario: number;
    idProjeto: number;
};