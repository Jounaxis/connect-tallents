const BASE_URL = import.meta.env.VITE_URL_BASE;

export const api = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error("Erro na requisição GET");
        return response.json() as Promise<T>;
    },

    post: async <T>(endpoint: string, body: unknown): Promise<T> => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error("Erro na requisição POST");
        if (response.status === 204 || response.headers.get("Content-Length") === "0") {
            return undefined as T;
        }
        return response.json() as Promise<T>;
    },

    put: async <T>(endpoint: string, body: unknown): Promise<T> => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error("Erro na requisição PUT");
        if (response.status === 204 || response.headers.get("Content-Length") === "0") {
            return undefined as T;
        }
        return response.json() as Promise<T>;
    },

    delete: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erro na requisição DELETE");
        if (response.status === 204 || response.headers.get("Content-Length") === "0") {
            return undefined as T;
        }
        return response.json() as Promise<T>;
    },
};
