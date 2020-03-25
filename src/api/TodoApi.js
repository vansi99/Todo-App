import axios from 'axios'

const TodoApi = axios.create({
    baseURL: "https://frozen-chamber-72233.herokuapp.com/api/v1"
})

const getTodoesApi = async () => {
    try {
        const todoes = await TodoApi.get(`/todoes`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return todoes.data;
    } catch (err) {
        throw new Error("Get todoes api", err.message);
    }
}

const updateTodoApi = async (todoId, content, status) => {
    try {
        const data = {
            content,
            status
        };
        const res = await TodoApi.put(`/todoes/${todoId}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (err) {
        throw new Error("Put todo api", err.message);
    }
}

const createTodoApi = async (content, status) => {
    try {
        const data = JSON.stringify({
            content,
            status
        })
        const res = await TodoApi.post(`/todoes/`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (err) {
        throw new Error("Create todo api", err.message);
    }
}

const deleteTodoApi = async (todoId) => {
    try {
        const res = await TodoApi.delete(`/todoes/${todoId}`);
        return res.data;
    } catch (err) {
        throw new Error("Delete todo api", err.message);
    }
}

export {
    getTodoesApi,
    updateTodoApi,
    createTodoApi,
    deleteTodoApi
}