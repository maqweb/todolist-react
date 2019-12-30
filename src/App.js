import React from 'react';
import './App.css';
import TodoList from "./TodoList.jsx";
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";

class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-todo-list', stateAsString)
    };

    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem('our-todo-list');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state)
    };

    addTodoList = (newTitle) => {

        let newTodoList = {
            id: this.props.todolists.length + 1,
            title: newTitle,
            tasks: []
        };
        this.props.addTodolist(newTodoList);
    };

    removeTodolist = () => {
      alert('Remove!')
    };

    render = () => {
        const todoLists = this.props.todolists.map(tl => <TodoList id={tl.id}
                                                                   key={tl.id}
                                                                   title={tl.title}
                                                                   tasks={tl.tasks}
                                                                   removeTodolist={this.removeTodolist}/>);

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
        todolists: state.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodolist) => {
            const action = {type: "ADD-TODOLIST", newTodolist: newTodolist};
            dispatch(action)
        },
        removeTodolist: (todolistId) => {
            const action = {type: "REMOVE-TODOLIST", todolistId: todolistId};
            dispatch(action);
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
