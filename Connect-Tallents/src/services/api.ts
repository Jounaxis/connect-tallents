const BASE_URL = import.meta.env.VITE_URL_BASE;

async function ensureOk(response: Response, method: string) {
    if (response.ok) return;
    const detail = await response
        .text()
        .then((txt) => txt || response.statusText)
        .catch(() => response.statusText);
    throw new Error(`HTTP ${response.status} ${method} - ${detail}`.trim());
}

export const api = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        await ensureOk(response, "GET");
        return response.json() as Promise<T>;
    },

    post: async <T>(endpoint: string, body: unknown): Promise<T> => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        await ensureOk(response, "POST");
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
        await ensureOk(response, "PUT");
        if (response.status === 204 || response.headers.get("Content-Length") === "0") {
            return undefined as T;
        }
        return response.json() as Promise<T>;
    },

    delete: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE",
        });
        await ensureOk(response, "DELETE");
        if (response.status === 204 || response.headers.get("Content-Length") === "0") {
            return undefined as T;
        }
        return response.json() as Promise<T>;
    },
};
