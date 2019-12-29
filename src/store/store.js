import {createStore} from "redux";

const initialState = {
    todolists: [
        {id: 1, title: "first", tasks: [{title: "asd", isDone: false, id: 1, priority: "no"}]},
        {id: 2, title: "second", tasks: [{title: "qwe", isDone: false, id: 1, priority: "no"}]},
        {id: 3, title: "third", tasks: [{title: "zxc", isDone: false, id: 1, priority: "no"}]},
    ],
    // filterValue: 'All'
};

const reducer = (state = initialState, action) => {
    console.log("reducer: ", action);

    switch (action.type) {

        case 'ADD-TODOLIST':
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            };

        case 'ADD-TASK':
            return {
              ...state,
              todolists: state.todolists.map(tl => {
                  if (tl.id === action.todolistId) {
                      return {...tl, tasks: [...tl.tasks, action.newTask] }
                  } else {
                      return tl;
                  }
              })
            };

        default:
            return state;
    }

};

const store = createStore(reducer);
export default store;