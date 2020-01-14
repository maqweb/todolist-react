import React from 'react';
import './App.css';
import TodoList from "./TodoList.jsx";
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTolistAC, setTodolistAc} from "./store/reducer";
import axios from "axios";

class App extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {
                withCredentials: true,
                headers: {'API-KEY': '6ab52400-1718-48c6-9e57-f24fa6232ed9'}
            })
            .then(res => {
                this.props.setTodolist(res.data)
            });

    };

    addTodoList = (newTitle) => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title: newTitle},
            {
                withCredentials: true,
                headers: {'API-KEY': '6ab52400-1718-48c6-9e57-f24fa6232ed9'}
            }
        )
            .then(res => {
                let newTodolist = res.data.data.item;
                this.props.addTodolist(newTodolist)
            });
    };

    render = () => {
        const todoLists = this.props.todolists.map(tl => <TodoList id={tl.id}
                                                                   key={tl.id}
                                                                   title={tl.title}
                                                                   tasks={tl.tasks}/>);
        return (
            <>
                <div className="mainInput">
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists,
        tasks: state.todolists.tasks
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodolist) => {
            const action = addTolistAC(newTodolist);
            dispatch(action)
        },
        setTodolist: (resTodolist) => {
            const action = setTodolistAc(resTodolist);
            dispatch(action)
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
