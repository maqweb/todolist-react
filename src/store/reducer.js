export const ADD_TODOLIST = 'ADD-TODOLIST';
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
export const ADD_TASK = 'ADD-TASK';
export const SET_TASKS = 'SET_TASKS';
export const REMOVE_TASK = 'REMOVE-TASK';
export const CHANGE_TASK = 'CHANGE-TASK';
export const SET_TODOLIST = 'SET_TODOLIST';

const initialState = {
    todolists: [
        // {
        //     id: 1, title: "first", tasks: [
        //         {title: "html/css", isDone: false, id: 1, priority: "low"},
        //         {title: "javascript", isDone: false, id: 2, priority: "high"},
        //         {title: "react", isDone: false, id: 3, priority: "high"},
        //     ]
        // },
        // {id: 2, title: "second", tasks: []},
        // {id: 3, title: "third", tasks: []},
    ]
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_TODOLIST:
            return {
              ...state,
              todolists: action.todolists.map(tl => ({...tl, tasks: []}) )
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

export const addTolistAC = (newTodolist) => {
    return {type: ADD_TODOLIST, newTodolist}
};

export const removeTodolistAC = (todolistId) => {
    return {type: REMOVE_TODOLIST, todolistId}
};

export const setTaskAC = (tasks, todolistId) => {
    return {type: SET_TASKS, tasks, todolistId}
};

export const addTaskAC = (newTask, todolistId) => {
    return {type: ADD_TASK, newTask, todolistId}
};

export const updateTaskAC = (taskId, obj, todolistId) => {
    return {type: CHANGE_TASK, taskId, obj, todolistId}
};

export const removeTaskAC = (todolistId, taskId) => {
    return {type: REMOVE_TASK, todolistId, taskId}
};

export default reducer;
