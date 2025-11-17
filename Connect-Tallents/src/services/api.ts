const BASE_URL = import.meta.env.VITE_URL_BASE;

export const api = {
    get: async (endpoint: string) => {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error("Erro na requisição GET");
        return response.json();
    },

    post: async (endpoint: string, body: any) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return response.json();
    },

    put: async (endpoint: string, body: any) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return response.json();
    },

    delete: async (endpoint: string) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE",
        });
        return response.json();
    }
};
