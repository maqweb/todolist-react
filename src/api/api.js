import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
    headers: {'API-KEY': '6ab52400-1718-48c6-9e57-f24fa6232ed9'}
});

export const api = {
    getTodolists() {
        return instance.get(``)
    },
    getTasks(todolistId) {
        return instance.get(`${todolistId}/tasks`)
    },
    addTodoList(newTitle) {
        return instance.post(``, {title: newTitle})
    },
    addItem(todolistId, newTitle) {
        return instance.post(`${todolistId}/tasks`, {title: newTitle})
    },
    removeTodolist(todolistId) {
        return instance.delete(`${todolistId}`)
    },
    removeTask(todolistId, taskId) {
        return instance.delete(`${todolistId}/tasks/${taskId}`)
    },
    changeTask(todolistId, taskId, updatedTask) {
        return instance.put(`${todolistId}/tasks/${taskId}`, updatedTask)
    },
    changeTodolistTitle(todolistId, newTitle) {
        return instance.put(`${todolistId}`, {title: newTitle})
    }
};