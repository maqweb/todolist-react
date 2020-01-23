import {api} from "../api/api";

export const ADD_TODOLIST = 'ADD-TODOLIST';
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
export const ADD_TASK = 'ADD-TASK';
export const SET_TASKS = 'SET_TASKS';
export const REMOVE_TASK = 'REMOVE-TASK';
export const CHANGE_TASK = 'CHANGE-TASK';
export const SET_TODOLIST = 'SET_TODOLIST';
export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';

const initialState = {
    todolists: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_TODOLIST:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            };

        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [action.newTodolist, ...state.todolists]
            };

        case REMOVE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            };

        case CHANGE_TODOLIST_TITLE:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, title: action.newTitle}
                    } else {
                        return tl
                    }
                })
            };

        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: action.tasks}
                    } else {
                        return tl;
                    }
                })
            };

        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [action.newTask, ...tl.tasks]}
                    } else {
                        return tl;
                    }
                })
            };

        case REMOVE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: tl.tasks.filter(tl => tl.id !== action.taskId)}
                    } else {
                        return tl
                    }
                })
            };

        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id === action.taskId) {
                                    return {...t, ...action.obj}
                                } else {
                                    return t
                                }
                            }),
                        }
                    } else {
                        return tl
                    }
                })
            };

        default:
            return state;
    }
};

export const setTodolistAc = (todolists) => {
    return {type: SET_TODOLIST, todolists}
};

export const addTodolistAC = (newTodolist) => {
    return {type: ADD_TODOLIST, newTodolist}
};

export const removeTodolistAC = (todolistId) => {
    return {type: REMOVE_TODOLIST, todolistId}
};

export const setTaskAC = (tasks, todolistId) => {
    return {type: SET_TASKS, tasks, todolistId}
};

export const addTaskAC = (todolistId, newTask) => {
    return {type: ADD_TASK, todolistId, newTask}
};

export const updateTaskAC = (taskId, obj, todolistId) => {
    return {type: CHANGE_TASK, taskId, obj, todolistId}
};

export const removeTaskAC = (todolistId, taskId) => {
    return {type: REMOVE_TASK, todolistId, taskId}
};

export const changeTodolistTitleAC = (todolistId, newTitle) => {
    return {type: CHANGE_TODOLIST_TITLE, todolistId, newTitle}
};

export const getTodolistsTC = () => {
    return (dispatch) => {
        api.getTodolists().then(res => {
            dispatch(setTodolistAc(res.data))
        })
    }
};

export const addTodolistTC = (newTodolist) => {
    return (dispatch) => {
        api.addTodoList(newTodolist).then(res => {
            let newTodolist = res.data.data.item;
            dispatch(addTodolistAC(newTodolist))
        })
    };
};

export const getTasksTC = (taskId) => {
    return (dispatch) => {
        api.getTasks(taskId).then(res => {
            let allTasks = res.data.items;
            dispatch(setTaskAC(allTasks, taskId));
        })
    }
};

export const addTaskTC = (todolistId, newTask) => {
    return (dispatch) => {
        api.addItem(todolistId, newTask)
           .then(res => {
               let newTitle = res.data.data.item;
               dispatch(addTaskAC(todolistId, newTitle))
           });
    }
};


export default reducer;
