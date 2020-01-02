import {createStore} from "redux";

const initialState = {
    todolists: [
        {id: 1, title: "first", tasks: [{title: "asd", isDone: false, id: 1, priority: "no"}]},
        {id: 2, title: "second", tasks: [{title: "qwe", isDone: false, id: 1, priority: "no"}]},
        {id: 3, title: "third", tasks: [{title: "zxc", isDone: false, id: 1, priority: "no"}]},
    ]
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case 'ADD-TODOLIST':
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            };

        case 'REMOVE-TODOLIST':
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            };

        case 'ADD-TASK':
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

        case 'REMOVE-TASK':
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

        case 'CHANGE-TASK':
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

const allStore = createStore(reducer);
export default allStore;