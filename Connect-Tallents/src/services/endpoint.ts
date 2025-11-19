import { api } from "./api";
import { Usuario, Projeto, Tarefa, Mensagem, Avaliacao, Colaboracao } from "../types/Dominio";

export const endpoints = {
    listarUsuarios: () => api.get<Usuario[]>("/usuarios"),
    listarProjetos: () => api.get<Projeto[]>("/projetos"),
    listarTarefas: () => api.get<Tarefa[]>("/tarefas"),
    listarMensagens: () => api.get<Mensagem[]>("/mensagens"),
    listarAvaliacoes: () => api.get<Avaliacao[]>("/avaliacoes"),
    listarColaboracoes: () => api.get<Colaboracao[]>("/colaboracoes"),

    criarUsuario: (data: Partial<Usuario>) =>
        api.post<Usuario>("/usuarios", data),

    criarProjeto: (data: Partial<Projeto>) =>
        api.post<Projeto>("/projetos", data),

    criarMensagem: (data: Partial<Mensagem>) =>
        api.post<Mensagem>("/mensagens", data),

    deletarMensagem: (id: number) =>
        api.delete<void>(`/mensagens/${id}`),

    criarColaboracao: (data: Partial<Colaboracao>) =>
        api.post<Colaboracao>("/colaboracoes", data),

    criarAvaliacao: (data: Partial<Avaliacao>) =>
        api.post<Avaliacao>("/avaliacoes", data),

    obterUsuario: (id: number) => api.get<Usuario>(`/usuarios/${id}`),

    atualizarUsuario: (id: number, data: Partial<Usuario>) =>
        api.put<Usuario>(`/usuarios/${id}`, data),
};
