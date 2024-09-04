import axios from "axios";

const api = axios.create({
    baseURL: "https://farmacia-nest-t0o5.onrender.com"
});

export const listar = async <T>(url: string): Promise<T> => {
    try {
        const resposta = await api.get<T>(url);
        return resposta.data;
    } catch (error) {
        console.error("Erro ao listar:", error);
        throw error;
    }
}

export const cadastrar = async <T>(url: string, dados: Object): Promise<T> => {
    try {
        const resposta = await api.post<T>(url, dados);
        return resposta.data;
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        throw error;
    }
}

export const atualizar = async <T>(url: string, dados: Object): Promise<T> => {
    try {
        const resposta = await api.put<T>(url, dados);
        return resposta.data;
    } catch (error) {
        console.error("Erro ao atualizar:", error);
        throw error;
    }
}

export const deletar = async (url: string) => {
    try {
        await api.delete(url);
    } catch (error) {
        console.error("Erro ao deletar:", error);
        throw error;
    }
}
