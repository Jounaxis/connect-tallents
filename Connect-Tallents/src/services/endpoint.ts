import { api } from "./api";

export const endpoints = {
    // === LISTAGENS ===
    listarUsuarios: () => api.get("/usuarios"),
    listarProjetos: () => api.get("/projetos"),
    listarTarefas: () => api.get("/tarefas"),
    listarMensagens: () => api.get("/mensagens"),
    listarAvaliacoes: () => api.get("/avaliacoes"),
    listarColaboracoes: () => api.get("/colaboracoes"), 

    // === CRIAÇÃO ===
    criarUsuario: (data: any) => api.post("/usuarios", data),
    criarProjeto: (data: any) => api.post("/projetos", data),
    criarMensagem: (data: any) => api.post("/mensagens", data),
    criarColaboracao: (data: any) => api.post("/colaboracoes", data), 
};
