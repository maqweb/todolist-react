export const ADD_TODOLIST =  'Todolist/Reducer/ADD-TODOLIST';
export const REMOVE_TODOLIST =  'Todolist/Reducer/REMOVE-TODOLIST';
export const ADD_TASK =  'Todolist/Reducer/ADD-TASK';
export const REMOVE_TASK =  'Todolist/Reducer/REMOVE-TASK';
export const CHANGE_TASK =  'Todolist/Reducer/CHANGE-TASK';


const initialState = {
    todolists: [
        {id: 1, title: "first", tasks: [
                {title: "html/css", isDone: false, id: 1, priority: "low"},
                {title: "javascript", isDone: false, id: 2, priority: "high"},
                {title: "react", isDone: false, id: 3, priority: "high"},
                ]
        },
        {id: 2, title: "second", tasks: []},
        {id: 3, title: "third", tasks: []},
    ]
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            };

        case REMOVE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            };

        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl;
                    }
                })
            };

        case REMOVE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId){
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



export const updateTaskAC = (taskId, obj, todolistId) => {
  return {type: CHANGE_TASK, taskId, obj, todolistId}
};

export default reducer;
