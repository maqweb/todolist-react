import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    headers: {'API-KEY': '6ab52400-1718-48c6-9e57-f24fa6232ed9'}
});

export const api = {
    authMe(){
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = false) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`);
    },
    getTodolists() {
        return instance.get(`todo-lists/`)
    },
    getTasks(todolistId) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    addTodoList(newTitle) {
        return instance.post(`todo-lists/`, {title: newTitle})
    },
    addItem(todolistId, newTitle) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title: newTitle})
    },
    removeTodolist(todolistId) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    removeTask(todolistId, taskId) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    changeTask(todolistId, taskId, updatedTask) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, updatedTask)
    },
    changeTodolistTitle(todolistId, newTitle) {
        return instance.put(`todo-lists/${todolistId}`, {title: newTitle})
    }
};